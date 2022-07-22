import React from 'react'
import axios from 'axios'

import { useState, useEffect } from 'react'

function PostToDoItem({ setTodo }) {

    const [ todoItem, setToDoItem ] = useState()
    const [ checkedItems, setCheckedItems] = useState([])
    const [ description, setDescription ] = useState('');
    const [ checkmark, setCheckMark ] = useState(false);


    const typesArray = ["study", "chore", "work", "other"]
 


    // Checkmarks
    const handleCheckmarks = (checkVal) => {
        // check the value selected
        console.log("New Item checked: ", checkVal.target.value)

        // add the item in the array
        setCheckedItems([...checkedItems, checkVal.target.value])

        //show the array of checked items
        console.log("Checked Items")
        console.log(checkedItems);
    }

    // handle completed checkmark

    const handleCompleted = (e) => {
        if (!checkmark) {
            setCheckMark(true)
        }
        else {
            setCheckMark(false)
        }
        console.log(checkmark);
    }

    
    // storeData - add a new ToDo
    const storeData = (e) => {
        e.preventDefault()
        const data = {
          item: todoItem,
          type: checkedItems,
          description: description,
          done: checkmark,
        }
        console.log(data);
        axios
          .post("/api/toDos", data)
          .then((response) => {
            console.log(response)
          })
          .catch((err) => console.log(err))
      }

    return (
        <>
            <h1>My To Do Items</h1>
            <form onSubmit={storeData}>
                <label>
                    New to do: 
                    <input type="text" name="todoItem" onChange={(e) => setToDoItem(e.target.value)} />
                </label>
                <fieldset>
                    <legend>Choose types</legend>

                    {typesArray.map((item) => (
                        <label key={item}>
                            {item}
					        <input type="checkbox" name="checkedItems" value={item} onChange={handleCheckmarks} />
                        </label>
                    ))}
                    
                </fieldset>

                <label>
                    Description: 
                    <input type="text" name="description" onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <label>
                   Completed?
                    <input type="checkbox" name="checkmark" value={checkmark} onChange={handleCompleted} />
                </label>

                <button>Add</button>
                <input type="reset"></input>
            </form>

        </>
    )
}


export default PostToDoItem