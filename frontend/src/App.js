import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {

  const [todoHead, setTodoHead] = useState("")
  const [email, setEmail] = useState("")
  const [todo, setTodo] = useState([])

  const url = "http://localhost:5000/"

  useEffect(() => {

    const getTodos = async () => {

      const res = await axios.get(url)
      console.log(res);

      const todolist = res.data.map((val) => {
        return ({
          TodoHeading: val.TodoHeading,
          Email: val.Email
        })
      })
      console.log(todolist)
      setTodo(todolist)
    }

    getTodos();

  }, [])



  const AddTodo = async (e) => {

    e.preventDefault();

    try {
      await axios.post(url, {
        TodoHeading: todoHead,
        Email: email
      })

      setTodo([...todo, {
        TodoHeading: todoHead,
        Email: email
      }]);

    } catch (error) {
      console.log(error)
    }


    setTodoHead("");
    setEmail("");

  }


  return (
    <div className='parent'>

      <div className='headers'>
        <h1>NotifyTodo</h1>
        <div>
          Manage your team efficiently by notifying workers about the latest updates/tasks through email notifications.</div>
      </div>

      <div className="todo_wrapper">
        <div >
          <form onSubmit={AddTodo}>
            <input className='input' type="text" value={todoHead} onChange={(e) => setTodoHead(e.target.value)} placeholder="Todo " required />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />

            <button type="submit" className='addButton' >+</button>
          </form>

        </div>
        <div className='todo_container'>
          {/* All the todos  */}
          {
            todo.map((item, index) =>
              <div key={index} className='todo'>
                <div> <h3> {item.TodoHeading} </h3></div>
                <div className='todo_email'>  {item.Email} </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
