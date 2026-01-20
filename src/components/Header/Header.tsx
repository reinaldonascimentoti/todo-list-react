import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { StatsCard } from '../StatsCards/StatsCard'
import styles from './header.module.scss'
export const Header= () => {
  const {tasks}=useContext(TaskContext);
 const totalTasks = tasks.length;
 const completedTasks = tasks.filter(task => task.done).length;
 const pendingTasks = totalTasks - completedTasks;  

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
      <h1>Mytodo</h1>
      <span>Bem Vindo! Reinaldo Nascimento </span>
    </div>
    <div>
      <StatsCard title='Total de Tarefas' value={totalTasks}/>
      <StatsCard title='Tarefas Pendentes' value={pendingTasks}/>
      <StatsCard title='Tarefas Concluidas' value={completedTasks}/>
    </div>
    </div>
    </header>
    
  )
}