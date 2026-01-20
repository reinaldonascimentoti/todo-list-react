import './App.css'
import { Header } from './components/Header/Header'
import { Task } from './components/Task/Task'
import { TaskProvider } from './context/TaskContext'

  function App() {
    return (
      <TaskProvider>
        <Header />
        <Task/>
      </TaskProvider>
  )
}

export default App


