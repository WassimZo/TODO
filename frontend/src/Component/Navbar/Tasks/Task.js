import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../../../Context/UserContext'
import deleteIcon from './delete.svg'
import './Task.css'

export default function Task(props) {

  const [done, setDone ] = useState(props.done)
  const { removeTask, toggleTaskStatus } = useContext(UserContext)

  const handleDelete = async (id) => {
    try {
			const task = await removeTask(id);
		} catch(err) {}
  }

  const handleToggle = async (id) => {
    if(done) {
      setDone(false)
    }else {
      setDone(true)
    }
    
    try{
      const status = await toggleTaskStatus(id);
      console.log("request");
    }catch(err) {}
  }

  return (
    <div className='task'>
      <span className={done ? "checked" : ""}>{props.description}</span>
      {done ? 
      <input type="checkbox" className='done' checked onChange={(e) => handleToggle(props.id)}/> :
      <input type="checkbox" className='done'  onChange={(e) => handleToggle(props.id)}/>
      }
      
      <img src={deleteIcon} alt="delete-icon" onClick={(e) => {handleDelete(props.id)}} />
    </div>
  )
}
