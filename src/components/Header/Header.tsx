import { StatsCard } from '../StatsCards/StatsCard'
import styles from './header.module.scss'
export const Header= () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
      <h1>Mytodo</h1>
      <span>Bem Vindo! Reinaldo Nascimento </span>
    </div>
    <div>
      <StatsCard title='Total de Tarefas' value={5}/>
      <StatsCard title='Tarefas Pendentes' value={2}/>
      <StatsCard title='Tarefas Concluidas' value={3}/>
    </div>
    </div>
    </header>
    
  )
}