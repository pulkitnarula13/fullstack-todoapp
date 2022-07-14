import React from 'react'
import { useState, useEffect } from 'react'

const GetToDoItems = props => {
    
    const [ todoitems, setToDoItems ] = useState([])

    return (
        <>
        <h2>To Dos</h2>
        <ul>
            {todoitems.map((todoitem)=>
                <li key={todoitem._id}>
                    <h3>{todoitem.item}</h3>
                    <p>{todoitem.type.join(', ')}</p>
                    <button>Delete</button>
                </li>
            )}
        </ul>
        </>
    )
}

export default GetToDoItems
