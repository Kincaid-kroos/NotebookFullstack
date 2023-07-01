import React from 'react'

const TodoSearch = ({inputText,handleinput,ButtonAdd}) => {



  return (
    <div className='todo-search'>
<form action = "">
<input type='text' placeholder='Enter task' value={inputText} onChange = {handleinput}/>
<button onClick={ButtonAdd}>Add</button>

</form>
    </div>
  )
}

export default TodoSearch