import React from 'react'
import axios from 'axios'

import { useState, useEffect } from 'react'

function PostToDoItem({ setTodo }) {

    const [ todoItem, setToDoItem ] = useState()
    const [ checkedItems, setCheckedItems] = useState([])
    const [ checked, setChecked ] = useState([]);
    const [ description, setDescription ] = useState('');
    const [ checkmark, setCheckMark ] = useState();


    const typesArray = ["study", "chore", "work", "other"]
 


    //Reference - https://contactmentor.com/checkbox-list-react-js-example/
    const handleCheck = (event) => {
        let updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
      };

    let checkedItemss = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

    
    // storeData - add a new ToDo
    const storeData = (event) => {
        
        event.preventDefault()
        axios.post('/api/toDos', { todoItem, checkedItemss })
            .then(res => {
                setToDoItem('')
                setCheckedItems('')
                setTodo(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <h1>My To Do Items</h1>
            <form onSubmit={storeData}>
                <label>
                    New to do: 
                    <input type="text" name="todoItem" />
                </label>
                <fieldset>
                    <legend>Choose types</legend>

                    {typesArray.map((item) => (
                        <label key={item}>
                            {item}
					        <input type="checkbox" name="checkedItems" value={item} onChange={handleCheck} />
                        </label>
                    ))}
                    
                </fieldset>

                <label>
                    Description: 
                    <input type="text" name="description" />
                </label>
                <label>
                   Completed?
                    <input type="checkbox" name="checkmark" value={checkmark} onChange={handleCheckmark} />
                </label>

                <button>Add</button>
                <input type="reset"></input>
            </form>

        </>
    )
}


export default PostToDoItem