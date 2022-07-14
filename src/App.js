import React from 'react'
import GetToDoItems from './GetToDoItems.js'
import PostToDoItem from './PostToDoItem.js'
import './style.css'

const App = props => {

    return (
        <>
            <PostToDoItem />
            <GetToDoItems />          
        </>
    )
}

export default App