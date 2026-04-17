import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
    const [textarea,settextarea] = useState('')
    const [ToDo,setToDo] = useState([])
    const [error,setError] = useState('')
    const [DoNe,setDoNe] = useState([])
    const per = (DoNe.length / (DoNe.length + ToDo.length)) * 100

  return (
    <>
    <div className="header">
      <div className="progress">
        <span className="label">達成率</span>
        <span 
          className={`percentage ${
            per < 30
            ? 'low'
            : per < 70
            ? 'middle'
            : 'high'
          }`}
        >
        {per}%</span>
      </div>
      <h1>今日のToDoList</h1>
    </div>
      

      <h1>{error}</h1>

      <textarea
        value = {textarea}
        onChange = {(e) => settextarea(e.target.value)}
      />


      <button onClick = {() => {
        if(textarea.trim() === ''){
          setError('入力してください')
          return
        }
        setToDo([...ToDo,textarea])
        settextarea('')
      }}>
        登録
      </button>

      {/*左右レイアウト */}
      <div className="container">
        <div className="left">
          <h2>今日のTodo(未達成)</h2>
          <ul>
            {ToDo.map((todo,index) => (
              <li key={index}>
              <input
                type="checkbox"
                onChange={() => {
                  setDoNe([...DoNe,todo])
                  setToDo(ToDo.filter((_,i) => i !== index))
                }}
              />
              <span className="todo-text">{todo}</span>
              <button
                type="button"
                className = "delete_button"
                onClick={() => {
                  setToDo(ToDo.filter((_,i) => i !== index))
                }}
              >
                🗑️
              </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="right">
          <h2>達成済み</h2>
          <ul>
            {DoNe.map((done,index) => (
              <li key={index}>
              <span className="done-text">{done}</span>
              <button
                type="button"
                className = "reverse_button"
                onClick = {() => {
                  setToDo([...ToDo,done])
                  setDoNe(DoNe.filter((_,i) => i !== index))
                }}
              >
                ⏪
              </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
        

    </>
  )
}

export default App
