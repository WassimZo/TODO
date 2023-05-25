import React from 'react'
import './Task.css'

export default function Task(props) {
  return (
    <div className='task'>
      <span>{props.description}</span>
      <input type="checkbox" className='done'/>
      <img src="./close.png" alt="delete-icon" />
    </div>
  )
}
