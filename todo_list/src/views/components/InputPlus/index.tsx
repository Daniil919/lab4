import React, {useState, useCallback} from 'react';

import styles from './index.module.scss';

// import { InputTask } from '../InputTask';

interface InputPlusProps {
    onAdd: (title: string)=> void;
}


export const InputPlus: React.FC<InputPlusProps> = ({
    onAdd,
}) => {
    const [inputValue,setInputValue] = useState('');
    const addTask = useCallback(()=>{
        onAdd(inputValue);
        setInputValue('');
    }, [inputValue])
return(
    <div className={styles.InputPlus}>
        <input
            type="text"
            className={styles.InputPlusValue}
            value={inputValue}
            onChange={(evt)=>{
                setInputValue(evt.target.value);
            }}
            onKeyDown={(evt)=>{
                if(evt.key === 'Enter')
                {
                   addTask();
                }
            }}
            placeholder="Введите задачу"
        />

        <button
        onClick={addTask}
        aria-label="Add"
        className={styles.InputPlusButton}       
        />
        {/* <button
        //onClick={addTask}
        aria-label="Comleted"
        className={styles.InputPlusButtonComleted}       
        /> */}
 
    </div>
)


}
