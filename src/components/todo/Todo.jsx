import React, { useState } from 'react';
import './Todo.scss';
import { nanoid } from 'nanoid';
import bgDpLi from '../images/bg-desktop-light.jpg';
// import bgDpDr from '../images/bg-desktop-dark.jpg';
import bgMbLi from '../images/bg-mobile-light.jpg';
// import bgMbDr from '../images/bg-mobile-dark.jpg';

import IconSun from '../images/icon-sun.svg';
import IconMoon from '../images/icon-moon.svg';

import TodoItem from './TodoItem';

const Todo = (props) => {
    const [name, setName] = useState('');
    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');
    
    const handleChange = (e) => {
        setName(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(name);
        setName("");
    }

    const addTask = (name) => {
        const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
        setTasks([...tasks, newTask]);
    }

    const toggleTaskCompleted = (id) => {
        const updatedTasks = tasks.map(task => {
            // If this task has the same ID as the edited task
            if (id === task.id) {
                // Use object spread to make a new object
                // Whose `Completed` prop has been inverted
                return {...task, completed: !task.completed}
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    const deleteTask = (id) => {
        const remainingTasks = tasks.filter(task => id !== task.id);
        setTasks(remainingTasks);
    }

    const FILTER_MAP = {
        All: () => true,
        Active: task => !task.completed,
        Completed: task => task.completed
    }

    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map(task => (
            <TodoItem 
                id={task.id} 
                name={task.name} 
                completed={task.completed} 
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
            />
    ))

    const FILTER_NAMES = Object.keys(FILTER_MAP);

    const filterList = FILTER_NAMES.map(name => (
        <p key={name} isPressed={name === filter} setFilter={setFilter} onClick={() => setFilter(name)}>{name}</p>
    ))

    const itemNoun = taskList.length !== 1 ? 'items' : 'item';
    const itemLeft = `${taskList.length} ${itemNoun} left`;
 
    return (
        <div className='todo'>
            <div className='todo_img'>
                <picture>
                    <source srcSet={`${bgMbLi} 1x`} media="(max-width: 500px)" />
                    <img
                        className="logo__apple"
                        srcSet={`${bgDpLi} 2x`}
                        alt="Full Logo"
                    />
                </picture>
            </div>
            <div className='todo_section'>
                <div className='todo_content'>
                    <h1>TODO</h1>
                    <img src={IconSun} alt='Icon Sun Todo' />
                    <img src={IconMoon} alt='Icon Moon Todo' />
                </div>
                <form onSubmit={handleSubmit} className='todo_search'>
                    <input 
                        type='checkbox' 
                        className='todo_checkdis' 
                    />
                    <input 
                        type='text' 
                        placeholder='Todo'
                        id='new-todo-input'
                        className='todo_input' 
                        name='text'
                        autoComplete='off'
                        onChange={handleChange}
                    />
                    <button type='submit'>Add Task</button>
                </form>
                <div className='todo_list'>
                    <ul className='todo_ul'>
                        {taskList}
                    </ul>
                    <div className='todo_bottom'>
                        <p>{itemLeft}</p>
                        <div className='todo_tasks'>
                            {filterList}
                            {/* <p className='all active'>All</p>
                            <p className='act'>Active</p>
                            <p className='completed'>Completed</p> */}
                        </div>
                        <p className='clear_completed'>Clear Completed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo;