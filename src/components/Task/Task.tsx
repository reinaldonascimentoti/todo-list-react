import { useEffect, useState } from "react";
import style from "./task.module.scss";
interface Tasks {
  title: string;
  done: boolean;
  id: number;
}
export const Task: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([] as Tasks[]);
  function handleSubmitAddTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (taskTitle.length < 3) {
      alert("Tarefa muito curta, não pode ter menos de 3 caracteres");
      return;
    }
    const newTask = [
       ...tasks, {title: taskTitle, done: false, id: new Date().getTime() },
    ];
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
    setTaskTitle("");
  }
    useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    console.log(storedTasks);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
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
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input 
            type="checkbox" 
            id={String(task.id)}
            checked={task.done} 
            onChange={() => toggleTask(task.id)}
             />
            <label htmlFor={String(task.id)}>{task.title}</label>
          </li>
        ))}
      </ul>
    </section>
  );
};
