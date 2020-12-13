import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const Home: React.FC = () => {
    const [toDoInput, setToDoInput] = useState<string>("") 
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [toDoArray, setToDoArray] = useState<any>([])

    const loadToDo = () => {
        const getToDo = localStorage.getItem('toDoList');
        if (getToDo !== null){
            const parsedToDo = JSON.parse(getToDo);
            setToDoArray(parsedToDo);
            setIsLoaded(true)
        }
    }

    useEffect(() => {
        loadToDo()
    },[])

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const toDoObj = {
            "id": uuid(),
            "value": toDoInput
        }
        toDoArray.push(toDoObj)
        localStorage.setItem('toDoList', JSON.stringify(toDoArray))
        setToDoInput("")
    }

    const onChange = (event: any) => {
        const { name, value } = event.target
        if(name === "toDoInput"){
            setToDoInput(value)
        }
    }

    const onDelete = (event: any) => {
        const { value } = event.target;
        toDoArray.splice(value, 1);
        localStorage.setItem('toDoList', JSON.stringify(toDoArray));
        loadToDo()
    }
    
    return(
        <>
            <form onSubmit={onSubmit}>
                <input type="text" maxLength={120} onChange={onChange} name="toDoInput" value={toDoInput}></input>
                <input type="submit"></input>
            </form>
            {isLoaded ? toDoArray.map((todo:any, idx:any ) => {
                return (
                    <div key={todo.id}>
                        {todo.value}
                        <button value={idx} onClick={onDelete}>삭제</button>
                    </div>
                )
            }): <div>isLoading...</div>}
        </>
    )
}

export default Home