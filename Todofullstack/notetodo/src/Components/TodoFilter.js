

const TodoFilter = ({filterItems}) => {
    return (
  
  <select name="" id="" onChange={(e) => filterItems(e.target.value)}>
           <option value=""></option>
           <option value='false'>Active</option>
           <option value='true'>Completed</option>
  </select>
  
    )
  }
  
  export default TodoFilter