import React, {useState, useCallback} from 'react';

import styles from './index.module.scss';

interface InputTaskProps {
    id: string;
    title: string;
    filter: string;
    createdAt: number;

    onDone: (id: string,title: string, filter: string)=> void;
    onEdited: (id: string, title: string, filter: string)=> void;
    onRemoved: (id: string)=> void;
    onCompleted:(id: string,title: string,createdAt: number, filter: string)=> void;
    onnotcomletedTasks: (id: string, title: string, filter: string)=> void;
    onsearchTasks:(searchText: string)=> void;
}


export const InputTask: React.FC<InputTaskProps> = ({
    id,
    title,
    filter,
    createdAt,
    onDone,
    onEdited,
    onRemoved,
    onCompleted,
    onnotcomletedTasks,
    onsearchTasks,
}) => {

    const [checked, setChecked] = useState(false);
    const [isEditmode, setIsEditmode] = useState(false);
    const [value, setValue] = useState(title);
    const [fil, setFil] = useState(false);
    const [filtred, setFiltred] = useState(false);

        const [isVisible, setIsVisible] = useState(true);
      
        const handleClick = () => {
          setIsVisible(false);
        };

        
    
return(
    
    
    <div className={styles.inputTask}>
        
        <label className={styles.inputTaskLabel}>
          {/* <input
            type="checkbox"
            disabled={isEditmode || fil}
            checked={checked}
            className={styles.inputTaskCheckbox}
            onChange={(evt) => {
                setChecked(evt.target.checked);
                if (evt.target.checked)
                {
                    filter='Выполнен';
                    onDone(id,filter,title);
                }
            }}
          /> */}
          { isEditmode ? (
            <input
                value={value}
                onChange={(evt)=> {
                    setValue(evt.target.value);
                    
                }}
                className={styles.inputTaskTitleEdit}
            />

            ) : (
          
          <h3 className={styles.inputTaskTitle}>{title}</h3>
            )}
        </label>
        { isEditmode ? ( 
        <button
            aria-label="Save"
            className={styles.inputTaskSave}
            onClick={() => {
                onEdited(id,value,filter);
                setIsEditmode(false);
            }}
        />
        ) : (
        <button
            aria-label="Edit"
            className={styles.inputTaskEdit}
            onClick={() => {
            setIsEditmode(true);
        }}
        />
        )}
        <button
            aria-label="Remove"
            className={styles.inputTaskRemove}
            onClick={() => {
            if(confirm('Вы уверены что хотите удалить задачу?'))
            {
            onRemoved(id);
            }
        }}        
        />

        {filter==='Не выполнен' && (
        <button 
        aria-label="Completed"
        //disabled={true}
        className={styles.inputTaskCompleted}
        onClick={() => {
        filter='Выполнен';
        handleClick();
        onDone(id,filter,title);
        onCompleted(id,title,createdAt,filter);
        }}
        />
           )}

        {/* <button
            aria-label="NotCompleted"
            className={styles.inputTaskNotCompleted}
            onClick={() => {
            onnotcomletedTasks(id,title,filter);
        }}        
        /> */}
    </div>
    )



}
