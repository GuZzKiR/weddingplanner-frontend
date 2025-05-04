import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'https://weddingplanner-backend.onrender.com'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    axios.get(`${API_URL}/tasks/`).then(res => setTasks(res.data))
  }, [])

  const addTask = async () => {
    if (!newTask) return
    const response = await axios.post(`${API_URL}/tasks/`, {
      title: newTask,
      description: ''
    })
    setTasks([...tasks, response.data])
    setNewTask('')
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>WeddingPlanner Tasks</h1>
      <input
        type="text"
        placeholder="New task..."
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App