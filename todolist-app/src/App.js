import React, {useState} from "react";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import './App.css';

function App() {
    const [list, setList] = useState([])
    const [input, setInput] = useState('')
    const [editedInput, setEditedInput] = useState('')
    const [edit, setEdit] = useState(null)

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

    const editTodo = (id) => {
        setEdit(id)
        setEditedInput('')
    }

    const handleChangeEditingInput = (e) => {
        setEditedInput(e.target.value)
    }

    const submitEdit = (e) => {
        e.preventDefault();

        let updateList = list.map(i => {
            if (i.id === edit) {
                i.text = editedInput
                console.log(1)
            }
            return i;
        })
        setList(updateList)
        setEdit(null)
    }

    return (
        <div className="todo">
            <div className="todo__inner">
                <form className="todo__inner-form" onSubmit={addTodo}>
                    <h1>What's the Plan for Today?</h1>
                    <input type="text" onChange={handleChangeInput} value={input} placeholder="Add Todo"/>
                    <button className="todo__inner-form__add">Add Todo</button>
                </form>
                {edit &&
                <form className="todo__inner-form" onSubmit={submitEdit}>
                    <input className="edit-input" type="text" onChange={handleChangeEditingInput} value={editedInput}
                           placeholder="Edit Todo"/>
                    <button className="todo__inner-form__edit">Edit Todo</button>
                </form>
                }
                {!edit &&
                <div className="todo__inner-list">
                    {
                        list.map((i) => (
                            <div key={i.id} className={i.isComplete ? 'todo-row complete' : 'todo-row'}>
                                <div onClick={() => completeTodo(i.id)}>
                                    {i.text}
                                </div>
                                <ModeEditIcon className="edit" onClick={() => editTodo(i.id)}/>
                                <HighlightOffIcon className="delete" onClick={() => removeTodo(i.id)}/>
                            </div>
                        ))
                    }
                </div>
                }
            </div>
        </div>
    );
}

export default App;