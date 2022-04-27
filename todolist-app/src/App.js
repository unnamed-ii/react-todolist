import React, {useState} from "react";

import './App.css';

function App() {
    const [list, setList] = useState([])
    const [input, setInput] = useState('')
    const [edit, setEdit] = useState({
        id: null,
        text: ''
    })

    const handleChangeInput = (e) => {
        setInput(e.target.value)
    }

    const addTodo = (e) => {
        e.preventDefault();

        let todo = {
            id: Math.floor(Math.random() * 10000),
            isComplete: false,
            text: input
        }

        if (todo.text.trim() !== '') {
            setList([
                todo,
                ...list
            ])
        } else {
            alert('Todo is empty!')
        }
        setInput('')
    }

    const removeTodo = (id) => {
        const removedList = [...list].filter(todo => todo.id !== id)
        setList(removedList)
    }

    const completeTodo = (id) => {
        let updateList = list.map(i => {
            if (i.id === id) {
                i.isComplete = !i.isComplete
            }
            return i;
        })
        setList(updateList)
    }

    return (
        <div className="todo">
            <div className="todo__inner">
                <form className="todo__inner-form" onSubmit={addTodo}>
                    <h1>What's the Plan for Today?</h1>
                    <input type="text" onChange={handleChangeInput} value={input} placeholder="Add Todo"/>
                    <button>Add Todo</button>
                </form>
                <div className="todo__inner-list">
                    {
                        list.map((i) => (
                            <div key={i.id} className={i.isComplete ? 'todo-row complete' : 'todo-row'}>
                                <div onClick={() => completeTodo(i.id)}>
                                    {i.text}
                                </div>
                                <button className="edit">Edit</button>
                                <button className="delete" onClick={() => removeTodo(i.id)}>Delete</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default App;