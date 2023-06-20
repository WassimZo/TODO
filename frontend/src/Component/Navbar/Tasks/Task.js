import React, {useContext} from 'react'
import { UserContext } from '../../../Context/UserContext'
import deleteIcon from './delete.svg'
import './Task.css'

export default function Task(props) {

  const { removeTask } = useContext(UserContext)

  const handleDelete = async (id) => {
    try {
			const task = await removeTask(id);
		} catch(err) {}
  }


  return (
    <div className='task'>
      <span>{props.description}</span>
      <input type="checkbox" className='done'/>
      <img src={deleteIcon} alt="delete-icon" onClick={(e) => {handleDelete(props.id)}} />
    </div>
  )
}
