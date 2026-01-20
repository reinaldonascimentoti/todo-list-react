import { useContext, useState } from "react";
import style from "./task.module.scss";
import { TaskContext } from "../../context/TaskContext";

export const Task: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { tasks, setTasks } = useContext(TaskContext);

  function handleSubmitAddTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (taskTitle.length < 3) {
      alert("Tarefa muito curta, não pode ter menos de 3 caracteres");
      return;
    }
    const newTask = [
      ...tasks,
      { title: taskTitle, done: false, id: new Date().getTime() },
    ];
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
    setTaskTitle("");
    setIsEditing(false);
  }

  function toggleTask(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
  function deleteTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  }
  function editTask(id: number) {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (!taskToEdit) return;
    setTaskTitle(taskToEdit.title);
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    setIsEditing(true);
  }

  return (
    <section className={style.container}>
      <form onSubmit={handleSubmitAddTask}>
        <div>
          <label htmlFor="task-title">Adicionar Tarefa</label>
          <input
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            type="text"
            id="task-title"
            placeholder="Descreva a tarefa"
          />
        </div>
        <button type="submit">{isEditing ? "Salvar" : "Adicionar"}</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li className={task.done ? style.done_input : ""} key={task.id}>
            <input
              type="checkbox"
              id={String(task.id)}
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <label
              className={task.done ? style.done : ""}
              htmlFor={String(task.id)}
            >
              {task.title}
            </label>
            <div>
              <button onClick={() => editTask(task.id)}>Editar</button>
              <button onClick={() => deleteTask(task.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
