import create, {State, StateCreator } from 'zustand';

import React, {useState, useCallback} from 'react';

import { generateId } from './helpers';

export interface Task {
    id: string;
    title: string;
    createdAt: number;
    filter: string;
}

export interface Comtask {
    id: string;
    title: string;
    createdAt: number;
    filter: string;
}

export interface Stasks {
    id: string;
    title: string;
    createdAt: number;
    filter: string;
}

interface ToDoStore {
    tasks: Task[];
    comtasks: Comtask[];
    stasks: Stasks[];
    createTask: (title: string, filter: string) => void;
    updateTask: (id: string, title: string, filter: string) => void;
    removeTask: (id: string) => void;
    filterTask: (id: string, title: string, filter: string) => void;
    completedTasks: (id: string,title: string,createdAt: number, filter: string) => void;
    notcomletedTasks: (id: string) => void;
    searchTasks: (searchText: string) => void;
}

function isToDoStore(object: any): object is ToDoStore {
    return 'tasks' in object;
}

function isToDoStoreCom(object: any): object is ToDoStore {
    return 'comtasks' in object;
}

function isToDoStoreS(object: any): object is ToDoStore {
    return 'stasks' in object;
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>):StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
    if (isToDoStore(nextState) ) {
        window.localStorage.setItem('tasks', JSON.stringify(nextState.tasks));
    }
    if (isToDoStoreCom(nextState) ) {
        window.localStorage.setItem('comtasks', JSON.stringify(nextState.comtasks));
    }
    if (isToDoStoreS(nextState) ) {
        window.localStorage.setItem('stasks', JSON.stringify(nextState.stasks));
    }
    set(nextState, ...args);
  }, get, api);

  const getCurrentState = () => { 
    try{
        const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[];
        return currentState;
    } catch(err) {
        window.localStorage.setItem('tasks', '[]');
    }
    return [];
  }

  const getCurrentStateCom = () => {
    try{
        const currentState = (JSON.parse(window.localStorage.getItem('comtasks') || '[]')) as Comtask[];
        return currentState;
    } catch(err) {
        window.localStorage.setItem('comtasks', '[]');
    }
    return [];
  }

  const getCurrentStateS = () => {
    try{
        const currentState = (JSON.parse(window.localStorage.getItem('stasks') || '[]')) as Stasks[];
        return currentState;
    } catch(err) {
        window.localStorage.setItem('stasks', '[]');
    }
    return [];
  }
  

export const useToDoStore = create<ToDoStore>(localStorageUpdate((set,get) => ({
    tasks: getCurrentState(),
    comtasks: getCurrentStateCom(),
    stasks: getCurrentStateS(),
    createTask: (title,filter) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
            filter: filter = 'Не выполнен',
        }
        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id: string, title: string, filter: string) => {
        const { tasks } = get();
        const { comtasks } = get();
        set({
             tasks: tasks.map((task)=>({
                ...task,
                title: task.id === id ? title : task.title,
             })),
            comtasks: comtasks.map((comtask)=>({
                    ...comtask,
                    title: comtask.id === id ? title : comtask.title,
                }))
             });
    },
    removeTask: (id: string) => {
        const { tasks } = get();
        const { comtasks } = get();
        set({
             tasks: tasks.filter((task)=>task.id !== id),
             comtasks: comtasks.filter((comtask)=>comtask.id !== id)
        });
    },
    filterTask: (id: string, filter: string, title: string) =>{
        console.log(filter);
            const { tasks } = get();
            set({
                tasks: tasks.map((task)=>({
                    ...task,
                    filter: task.id === id ? filter : task.filter,
                })),
                //tasks: tasks.filter((task)=>((task.id === id) && (task.filter = 'Выполнен'))),
            });
            //const one: Task = {
               // filter: 'Выполнен'
            //} 
            console.log(tasks)
            console.log("выполнен: " + Date.now())
    },
    completedTasks: (id: string, title: string, createdAt: number, filter: string) => {
        const { tasks } = get();
        const { comtasks } = get();
        const newTask = {
            id: id,
            title: title,
            createdAt: createdAt,
            filter: filter,
        }
        set({
            comtasks: tasks.filter((task)=>(task.filter === 'Выполнен')),
            //tasks: tasks.filter((task)=>(task.filter === 'Не выполнен')),
            //comtasks: [newTask].concat(tasks),
            
        })
        //inactive();
        //console.log("такска" + newTask)
        console.log(comtasks);      
    },
    notcomletedTasks: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task)=>(task.filter === 'Не выполнен')),
        })
    },



    searchTasks: (searchText: string)  => {
        const { tasks } = get();
        //const { comtasks } = get();
        const { stasks } = get();
        if (!searchText) {
        set({
        tasks: tasks,
        })
        }
        set({
        stasks: tasks.filter((task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase()))
        })
        //stasks.length = 0
        
    },

})));