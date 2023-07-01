import './App.css';
import {useEffect, useState} from 'react';
import TodoSearch from './Components/TodoSearch';
import TodoFilter from './Components/TodoFilter';
import TodoList from './Components/TodoList';
import Footer from './Components/Footer'


import axios from 'axios';

const csrfAxios = axios.create();
csrfAxios.defaults.xsrfCookieName = 'csrftoken';
csrfAxios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Use `csrfAxios` for your requests instead of `axios`




function App() {
const[todos,setTodos] = useState([
])
const[inputTodo,setInputTodo] = useState("")

//state to handle CRUD errors
const [errors,setErrors] = useState("")

const fetchBackendApi = () => {
  csrfAxios.get('http://127.0.0.1:8000/backendapi')
  .then(res => {
    setTodos(res.data)
  })
  .catch(err => setErrors(err.message))
}
 
useEffect(() => {
   fetchBackendApi()
},[]
)



const handleInputChange = (e) => {
const {value} = e.target
setInputTodo(value)
}

//Before csrfaxios was added to addItems button
//const addItemsBtnAdd = (e) => {
  //e.preventDefault()
  //setTodos(prev => {
    //return [...prev,inputTodo]})
  //})
//}

//After adding CsrfAxios post request
const addItemsonBtnAdd = (e) => {
  const newData = {
  task:inputTodo
 }
csrfAxios.post("http://127.0.0.1:8000/backendapi/" , newData )
   .then((res) => setTodos([...todos,res.data]))
    .catch(err=> setErrors(err.message))
setInputTodo("")
e.preventDefault()
}


//deleting from an array holdings items x in a state
const deleteItem = (id) => {
setTodos(prev => prev.filter( item => item.id!==id))
//if you have a wrong endpoint the originaltask variable helps to revert back to original todos
//const originalTask = [...todos]
csrfAxios.delete('http://127.0.0.1:8000/backendapi/' + id)
//since its deletion no need of .then Go catch errors direct
.catch(err => setErrors(err.message))
//setTodos([originalTask]) 
}

//updating an array holding items x in a state
const updateItem = (id,updatedtask) => {
  //getting the current task/item/todo we want to update
  const currenttask = todos[id]
  //updating to a new task by creating an argument object that will hold the updates as "updatedtask"
  //the updatedtask arg is from the itemlist state in Todolist component since we have come to use the itemlist as a 
  //parameter arg on the updateitem function of the onSubmit/onClick on the component, go through to confirm
  const updates = {...currenttask,task:updatedtask, status:"Active"}
  csrfAxios.patch('http://127.0.0.1:8000/backendapi/' + id)
  .then(res => setTodos(prev => prev.map(t => t.id===id?{...t,...updates}:t)))
  .catch(err => setErrors(err.message))
  
} 


//const updateItem = (id, updatedTask) => {
  //setTodos(prev => {
    //return prev.map(todo => {
     // if (todo.id === id) {
       // return { ...todo, task: updatedTask, status: 'Active' };
      //}
      //return todo;
    //});
  //});
//};


//newstatus is a prop used to get the current status of the task, i created a state in Todolist component as an empty object
//[newstatus, setnewStatus]  and then passed it a props to checkstatus onChange in the
//<input type='checkbox' onChange={(e) => checkStatus(e,item.id,newstatus)}/>
//Then created an updatedStatus object that spreads and copies all the items set to true
const checkStatusAndCompletion = (e,id,newstatus) => {
  if(e.target.checked){
    setTodos(prev => prev.map(x => x.id ===id? {...x, completed:true}:x))
    const updatedStatus = {...newstatus, completed:true}
    csrfAxios.patch('http://127.0.0.1:8000/backendapi/' + id,updatedStatus)
  }
  else{
    setTodos(prev => prev.map(x => x.id===id?{...x,completed:false}:x))
    const updatedStatus = {...newstatus, completed:false}
    csrfAxios.patch('http://127.0.0.1:8000/backendapi/' + id,updatedStatus)
  }
} 


// code before CsrfAxios
//const filterItems = (completed) => {
//setTodos(prev => prev.filter( x => x.completed === completed ))
//}

const filterItems = (completed) => {
  csrfAxios.get('http://127.0.0.1:8000/backendapi/')
    .then(res => {
      const filteredTasks= res.data.filter(x => x.completed === (completed === "true"));
      setTodos(filteredTasks);
    })
    .catch(err => {
      setErrors(err.message);
    });
};


 





  return (
    <div className="todo-container">
      {errors && <p>{errors}</p>}
      <div><TodoSearch inputText = {inputTodo} handleinput={handleInputChange} ButtonAdd = {addItemsonBtnAdd}/></div>
     <div><TodoFilter filterItems={filterItems} /></div>
     <div>
     <TodoList todos= {todos} deleteTodo={deleteItem}  updateItem = {updateItem} checkStatus={checkStatusAndCompletion} />
     </div>
     <Footer />
     
    </div>
  );
}

export default App;

