const form = document.querySelector("form")
const cardContainer = document.querySelector(".card-container")
let DB = []

const addItemsToDOM = ()=>{
    //clear all items in the container  `
    cardContainer.innerHTML = ""

    //Loop through all the DB item
    DB.forEach(taskItem => {
        cardContainer.innerHTML += ` <div id = "${taskItem.id}" class="task-card">
    
        <!-- EDIT PART -->
        <div class="task-row edit">
            <input value = "${taskItem.task}" type = "text" class="edit-input"></input>
            <div class="options">
                <button class="option-btn green" onclick = "handleSave(${taskItem.id})">Save</button>
                <button class="option-btn red" onclick = "handleCancelEditing(${taskItem.id})">Cancel</button>
            </div>
        </div>

        <!-- //PREVIEW PART -->
        <div class="task-row preview">
            <p class="text">${taskItem.task}</p>
            <div class="options">
                <button class="option-btn blue" onclick = "handleToggleEditing(${taskItem.id}) " >Edit</button>
                <button class="option-btn red" onclick = "handleDeleteTask(${taskItem.id})">Delete</button>
            </div>
        </div>
    </div>`

    })

}

const handleAddNewTask = ()=>{
//Get the input value

const input = document.querySelector(".form-control")
const inputValue = input.value.trim()
//Check if there's a value in the inputValue variable
if(!inputValue){
    alert("Please add a task")
    return
}

//Create a new task card
const newTaskItem = {
    task: inputValue,
    id: Date.now()
}

DB.push(newTaskItem)

// Append it to task container
addItemsToDOM()

//Clear the input value
input.value = ""


} 


form.addEventListener("submit", (event) =>{
    event.preventDefault(); // It will stop the page from refreshing on submit i.e clicking the button
    handleAddNewTask();
    saveDBToLocalStorage();
})

//Function to delete an item added
const handleDeleteTask = (id)=>{
   // console.log("ID => ", id)
    //Remove the element containing the id from the DB array

    //With filter
    const filteredItems = DB.filter((taskItem)=>{
        return taskItem.id !== id
    })

    DB = filteredItems

    //With Splice
    // const index = DB.findIndex(taskItem => taskItem.id == id)
    // console.log(index)
    // DB.splice(index, 1)

    //Remove the article element containing the task item
    //Method 1:
    //addItemsToDOM()

    //Method 2:
     document.getElementById(id).remove()
     saveDBToLocalStorage();

}

const handleToggleEditing = (id) => {
    const taskItemContainer = document.getElementById(id)
    if(taskItemContainer.classList.contains('editing')){
        //If it has editing already; remove it
        taskItemContainer.classList.remove("editing")
    }else{
        //If it does not have editing; add it
        taskItemContainer.classList.add("editing")
    }
    saveDBToLocalStorage();

}

const handleCancelEditing = (id) => {
    const taskItemContainer = document.getElementById(id)
    if(taskItemContainer.classList.contains('editing')){
        //If it has editing already; remove it
        taskItemContainer.classList.remove("editing")
    }
}

const handleSave = (id) => {
    const taskItemContainer = document.getElementById(id)
   const inputValue = taskItemContainer.querySelector(".edit-input").value

   //Update the new valid in DB array
   const index = DB.findIndex(task => task.id == id)

   //Using index position to update the value
   DB[index] = {
    id,
    task: inputValue
   }

   //Using splice to update the value
//    const updatedValue = {
//     id, 
//     inputValue
//    }

//    DB.splice(index, 1, updatedValue)

   //Update the DOM
   addItemsToDOM()
}



// to store the array
// Function to save the 'DB' array to local storage
const saveDBToLocalStorage = () => {
    localStorage.setItem("DB", JSON.stringify(DB));
  };



  window.addEventListener("load", () => {
    // Check if there is data in local storage
    const DBData = localStorage.getItem("DB");
    if (DBData) {
      DB = JSON.parse(DBData);
    }
    addItemsToDOM();
  });
//STORAGES IN JAVASCRIPT
// -Local storage
// -Session storage

// -Indexed DB