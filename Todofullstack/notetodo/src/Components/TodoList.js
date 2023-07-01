import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useState } from 'react';

const TodoList = ({todos,deleteTodo,updateItem,checkStatus}) => {
 //handles the linethrough
 //handles the newstatus states in the checkstatusAndCompletion btn to handle new status of the tasks
 //just wanted to use this state as a prop to get the current status of my tasks but i dont need to setnewstatus
 const[newstatus] = useState({})

  const[isDone,setIsDone] = useState(false)
  //handles the updateform 
  const[modalToggle,setModalToggle] = useState(false)
  //displaying item on the uodateform input field and performing an onchange on it so 2 roles
  const [itemlist,setItemList] = useState("")
  //setting the ids so the i can use it as an argument on the onsubmit updateitem function to be able to be used
  //by the parent on app.js
  //this id state will help me store the id of the items when i click the add updatebtn of the toggle
  const[listid,setListid] = useState(0)
   

//function to handle the onchange on the update input form
  const updateInput = (e) => {
    const{value} = e.target
    setItemList(value)
  } 

//Handles add button on the list
  const ModleAddClick = (list,id) => {
    setModalToggle((prev) => !prev);
    setItemList(list);
    setListid(id);
      
  }
  //handles cancel button on the update form
  const cancelBtn = () => {
    setModalToggle(false);
  }
  const alert = () => {
    window.alert("Are you sure you want to delete");
  }

//click item on the list function to give a linethrough
const handleclickitem = () => {
   setIsDone( prevValue => {
      return !prevValue 
   })}
   //or setIsDone ( prevValue => !prevValue) and still works as the return statement

   //On this i did made a delete function on app.js the passsed it as props to this todolist child component and used it as
   //an onlick on the delete icon of the app by saying onclick = {() => { Deletetodo(index)}}
//where the index is the unique id i created on as a key on the parent div of this todolist

//Important!!! on line 65 on the onClick i add added onClick={() =>ModleAddClick(item.task,item.id)} to help me
//access the items on the p tag of the todos so instead
//of using the p simply reuse the javascript {item.task} to get the task inside the paragraph and {item.id} to return the id

  return (
   <div className='todo-list'>
     
     {todos.map(item =>
          <div className='todo-list-item' key = {item.id} >
          <div className= "task"  >
             <input type='checkbox' onChange={(e) => 
              checkStatus(e,item.id,newstatus)
             }/>
             
             <p onClick={handleclickitem}  style={{textDecoration: isDone?"line-through":""}} className={item.completed===true?"strike":""}>
               {item.task}
               </p>
               
            
         </div>
         <div className='btn-container'>
        <div className='edit' onClick={() =>ModleAddClick(item.task,item.id)}><i className='fa-solid fa-pen-to-square'><EditNoteIcon  /></i></div>
        <div className='del' onClick={() => {
          alert()
         deleteTodo(item.id)
        }}><i className='fa-solid fa-trash-can'><DeleteIcon  /></i></div>
      
        </div>
     </div>
     )}

     {modalToggle && (
     <div className='modal-container' >
      <div className='modal'>
          <h1>Update Form</h1>

          <form action='' onSubmit={(e) =>{
           updateItem(listid,itemlist);
           setModalToggle(false);
           e.preventDefault();
           }} >
              <input type='text' value={itemlist} onChange={updateInput}/>
              <button className='add' >Add</button>
          </form>

         <div className='btn-container'>
            <button className='cancel mod-btn' onClick={cancelBtn}>Cancel</button>
         </div>
      </div>
     </div>
     )}
     





    </div>
  )
}

export default TodoList;