import { useState } from "react";
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
    console.log(tasks);
    if (taskTitle.length <3) {
      alert("Tarefa muito curta, não pode ter menos de 3 caracteres");
      return
    }
    setTasks([
      ...tasks, { title: taskTitle, done: false, id: new Date().getTime() }
    ]);
    setTaskTitle('');
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
       {tasks.length > 0 ? (
  tasks.map((task) => (
    <li key={task.id}>
      <input type="checkbox" id={`${task.id}`} />
      <label htmlFor={`${task.id}`}>{task.title}</label>
    </li>
  ))
) : (
  <p>Nenhuma tarefa encontrada</p>
)}      
      </ul>
    </section>
  );
};
