import { createContext, useEffect, useState } from "react";

export interface Tasks {
  title: string;
  done: boolean;
  id: number;
}

interface TaskContextData {
  tasks: Tasks[];
  setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
}

export const TaskContext =createContext({} as TaskContextData);

interface TaskProviderProps {
  children: React.ReactNode;
}


export const TaskProvider: React.FC <TaskProviderProps> = ({children}) => {
  const [tasks, setTasks] = useState([] as Tasks[]);

      useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    console.log(storedTasks);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  return <TaskContext.Provider value={{tasks, setTasks}}>{children}</TaskContext.Provider>;
}
  