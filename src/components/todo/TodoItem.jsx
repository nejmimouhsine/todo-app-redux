import React from 'react';
import './Todo.scss';
import IconCross from '../images/icon-cross.svg';

const TodoItem = (props) => {
    return (
        <li>
            <div className='todo_item'>
                <input 
                    type='checkbox' 
                    id={props.id} 
                    defaultChecked={props.completed} 
                    onChange={() => props.toggleTaskCompleted(props.id)} 
                />
                <label htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <img src={IconCross} alt='Todo Check' onClick={() => props.deleteTask(props.id)} />
        </li>
    )
}

export default TodoItem;