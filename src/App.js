import React from 'react';
import Todo from './components/todo/Todo';

const App = (props) => {
    return (
        <div className="App">
            <Todo tasks={props.tasks} />
        </div>
    );
}

export default App;
