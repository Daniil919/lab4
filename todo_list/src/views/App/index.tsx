import React, {useState, useCallback} from 'react';
import { useToDoStore } from '../../data/stores/useToDoStore';
import { InputPlus } from '../components/InputPlus';
import styles from './index.module.scss';
import { InputTask } from '../components/InputTask';
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart, ArcElement} from "chart.js";
Chart.register(ArcElement);



export const App: React.FC = () => {
  const [
    tasks,
    comtasks,
    stasks,
    createTask,
    updateTask,
    removeTask,
    filterTask,
    completedTasks,
    notcomletedTasks,
    searchTasks,

  ] = useToDoStore(state=>[
    state.tasks,
    state.comtasks,
    state.stasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
    state.filterTask,
    state.completedTasks,
    state.notcomletedTasks,
    state.searchTasks,
  ]);

  const [isSearch,setIsSearch] = useState(false);
  const [search,setSearch] = useState('');

  const completedCount = comtasks.length;
  const uncompletedCount = tasks.length-comtasks.length;

  const data1 = {
    labels: ["Выполнено", "Не выполнено"],
    datasets: [
      {
        data: [completedCount, uncompletedCount],
        backgroundColor: ["rgb(0, 255, 149)", "rgb(255, 0, 94)"],
        hoverBackgroundColor: [
          "rgb(0, 255, 149, 0.8)",
          "rgb(255, 0, 94, 0.8)",
        ],
      },
    ],
  };

  const data2 = {
    labels: ["Выполнено", "Не выполнено"],
    datasets: [
      {
        data: [completedCount, uncompletedCount],
        backgroundColor: ["rgb(187, 255, 0)", "rgb(255, 123, 0)"],
        hoverBackgroundColor: [
          "rgb(187, 255, 0, 0.8)",
          "rgb(255, 123, 0, 0.8)",
        ],
      },
    ],
  };

  // const options: ChartOptions<'pie'>= {
  //   width: 200,
  //   height: 200,
  //   // Другие настройки графика
  // };

    return (
        <article className={styles.article}>
          <h1 className={styles.articleTitle}>Список Задач</h1>
          <input placeholder="поиск" 
          type="text"
          className={styles.articleValue}
          value={search}
          onChange={(e) => {
            {setSearch(e.target.value)}
            {searchTasks(e.target.value)}
            {setIsSearch(true)}
          }
          } 
          ></input>
          <section className={styles.articleSection}>
            <InputPlus 
            onAdd={(title)=>{
              if(title){
                createTask(title,'Не выполнен')
              }
            }}
            />
          </section>
          <section className={styles.articleSection}>
            {!tasks.length && (
              <p className={styles.articleText}> Задач нет! Вы свободны. </p>
            )}
            {isSearch && stasks.map((stask)=>
            <InputTask
               key={stask.id}
               id={stask.id}
               title={stask.title}
               filter={stask.title}
               createdAt={stask.createdAt}
               onDone={filterTask}
               onEdited={updateTask}
               onRemoved={removeTask}
               onCompleted={completedTasks}
               onnotcomletedTasks={notcomletedTasks}
               onsearchTasks={searchTasks}
            />
            )}
            {!isSearch  && tasks.map((task)=>
              
              <InputTask
                 key={task.id}
                 id={task.id}
                 title={task.title}
                 filter={task.filter}
                 createdAt={task.createdAt}
                 onDone={filterTask}
                 onEdited={updateTask}
                 onRemoved={removeTask}
                 onCompleted={completedTasks}
                 onnotcomletedTasks={notcomletedTasks}
                 onsearchTasks={searchTasks}
              />
            )}
              {comtasks.length > 0 &&
               <p className={styles.articleText}> Выполненные задачи: </p>
              }
              {comtasks.map((comtask)=>
              
                <InputTask
                   key={comtask.id}
                   id={comtask.id}
                   title={comtask.title}
                   filter={comtask.filter}
                   createdAt={comtask.createdAt}
                   onDone={filterTask}
                   onEdited={updateTask}
                   onRemoved={removeTask}
                   onCompleted={completedTasks}
                   onnotcomletedTasks={notcomletedTasks}
                   onsearchTasks={searchTasks}
                />
              )}
          </section>
          <section className={styles.articleSectionGraph}>
          <section className={styles.articleSectionPie}>
          <Pie data={data1}  />
          </section>
          <section className={styles.articleSectionDoughnut}>
          <Doughnut data={data2}  /> 
          </section>
          </section>
        </article>
        
    );
}