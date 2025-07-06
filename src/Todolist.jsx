import { useState, useEffect, useRef } from "react";

function Todolist(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setnewTask] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const isFirstRender = useRef(true);


  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      console.log("Loading from storage:", savedTasks);

      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
       } else {
          throw new Error("Data is not an array");
        }
      }
     catch (err) {
      console.error("Error loading tasks from localStorage:", err);
      localStorage.removeItem("tasks"); 
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
    function handleInputChange(event){
        setnewTask(event.target.value);
    }

    useEffect(() => {
      if (darkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }, [darkMode]);
  

    function addTask(){
        if (newTask.trim() !== '') {
            setTasks(t=>[...t, newTask]);
            setnewTask('');
        }
    }
    function deleteTask(index){
      const updatedTask=tasks.filter((_,i)=>i!==index);
      setTasks(updatedTask)
    }

    function moveTaskUp(index){
      if(index>0){
        const updatedTask=[...tasks];
        [updatedTask[index],updatedTask[index-1]]=[updatedTask[index-1],updatedTask[index]];
        setTasks(updatedTask);
      }
    }
    function moveTaskDown(index){
      if(index<tasks.length-1){
        const updatedTask=[...tasks];
        [updatedTask[index],updatedTask[index+1]]=[updatedTask[index+1],updatedTask[index]];
        setTasks(updatedTask);
      }
    }
    function clearAll() {
      setTasks([]);
      localStorage.removeItem('tasks');
    }

    function toggleDarkMode() {
      setDarkMode(prev => !prev);
    }

    return(
      <div className={`to-do-list ${darkMode ? 'dark' : ''}`}>
        <button className="dark-btn" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <div>
          <h1> <u><b>TO-DO-LIST</b></u>
          <b></b></h1>

          <div>
            <input className='text-box'type="text" 
                   placeholder="Enter a task"
                   value={newTask}
                   onChange={handleInputChange}
                   onKeyDown={(e)=>{
                    if(e.key==='Enter'){
                      addTask();
                    }
                   }}/>
                   <button className="add-button" onClick={addTask}>Add Task</button>
        </div>

          <div>
            <button className="clear-button" onClick={()=>{clearAll()}}>Clear All</button>
          </div>
          <hr />

          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <span className="move-group">
                  <button className="moving-btn" onClick={() => deleteTask(index)}>DELETE</button>
                  <button className="moving-btn" onClick={() => moveTaskUp(index)}>⬆️</button>
                  <button className="moving-btn" onClick={() => moveTaskDown(index)}>⬇️</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
}
export default Todolist;