
// ------------------------drag and drop ----------------------------------------
//getting the class from .html
const materialLinks = document.querySelectorAll(".materialAssigned");
const taskColumns = document.querySelectorAll(".columnInfo");
// at the beginning we don't know what item will be draggable
let draggableTasks = null;

// localStorage.setItem("input", "task");

// looping through other to do tasks
materialLinks.forEach((materialAssigned) => {
    materialAssigned.addEventListener("dragstart", dragStart);
    materialAssigned.addEventListener("dragend", dragEnd);
})

// creating a function called dragStart
function dragStart() {
  
  draggableTasks = this;
  // when the card is dragged it will print dragStart in the console
  console.log("dragStart");
}

function dragEnd() {
  // when it ends it is null
  draggableTasks = null;
  // when you leave the task dragEnd prints
  console.log("dragEnd");
}

//drop targets are the columns with the grey bg colour
taskColumns.forEach((columnInfo) => {
  columnInfo.addEventListener("dragover", dragOver);
  columnInfo.addEventListener("dragenter", dragEnter);
  columnInfo.addEventListener("dragleave", dragLeave);
  columnInfo.addEventListener("drop", dragDrop);
})

function dragOver(e) {
  // by default dropping over an element is disabled, adding this would enable it to be draggable and dropped
  e.preventDefault();
  //only counts if it is dragged around the drop targets
  console.log("dragOver");
}

function dragEnter() {
  // When it enters the drop target
  console.log("dragEnter");
}

function dragLeave() {
  console.log("dragLeave");
  
}
function dragDrop() {
  this.appendChild(draggableTasks);
  // only fired when element is dropped on a drop target
  console.log("drop");
  
}

// have the material form pop up
function togglePopupMaterial(){
  document.getElementById("materialPopup").classList.toggle("active");
}








// ---------------TASK FORM FILL-----------------------
// creating task functionality


//need variables to keep track of our input elements themselves
//js variables referencing html elements
//get variable from DOM using actual 'document' object
const materialForm = document.getElementById("materialForm"); //get element by ID from HTML

//querySelector() general way to select elements
//allows you to pass in a CSS selector as the input parameter for that function in order to get an element from HTML. these elements are relevant to creating a task
const materialNameInput = document.querySelector("#materialNameInput") //# to get ID
const materialList = document.getElementById("materialList");
const materialDescriptionInput = document.getElementById("materialDescriptionInput");
const unitOfStudyInput = document.getElementById("unitOfStudyInput");
const materialGroupInput = document.getElementById("materialGroupInput");
const materialLinkInput = document.getElementById("materialLinkInput")


// getting the button create
const create = document.querySelectorAll(".create");
const tasksColumn = document.getElementById("tasksColumn");


//parameter 1 - event itself which is the submit
//parameter 2 - what we want to happen when the element is clicked on
materialForm.addEventListener("submit", function(event) { //defining and calling at the same time
  
  //none of the browser functionality will happen automatically when clicked
  event.preventDefault();
  
  //get value from material input of user
  let materialName = materialNameInput.value;
  let materialDescription = materialDescriptionInput.value;
  //array of collections
  //selected index of current element
  let unitOfStudy = unitOfStudyInput.value;
  // let unitOfStudy = unitOfStudyInput.options[unitOfStudyInput.selectedIndex].value;
  let materialGroup = materialGroupInput.value;

  console.log(materialListArray);
  
  //input bunch of parameters
  addMaterial(materialName, materialDescription, unitOfStudy)
})


// create empty array to store tasks
var materialListArray = [];

//Define a function called addMaterial for dynamically creating material objects
function addMaterial(name, description, unitofstudy, group, link ) {

    let d = new Date();
    let dateCreated = d.getFullYear();
  //Create the task object
    let material = {

       id: Date.now(),
   //using input parameters as property names for task object as shortcut
       name,
       description, //strings as our values
       unitofstudy,
       group,
       link
 };
  
  //Push task object to taskList Array
  materialListArray.push(material);
  console.log(materialListArray);
  renderMaterial(material); //render task to screen
}


//create render material function
//share material object with the function
function renderTask(material){

  updateEmpty();
  
  //create HTML structure (elements)
  let item = document.createElement("div");
  item.setAttribute("data-id", material.id);

  
  //output of the user's input in the task box
  //use array maybe?  https://stackoverflow.com/questions/52603796/to-do-list-with-array-and-functions
  item.innerHTML =`
     <ul class = "newTaskCreated">
        <li class = "taskDetails" >
                 <p class="createdUnitOfStudy">${task.unitofstudy}<p>
        </li>

        <li class = "taskDetails">
            <p class="createdTaskName">${task.name}<p>
        </li>

        <li class = "taskDetails">
            <p class="createdTaskDescription">${task.description}<p>
        </li>


        <li class = "taskDetails">
            <nav class = "dateAndTime">
                <div class = "due">
                    <p class="createdCompletionTime"> ${task.completionTime}<p>
                </div>
                <div class = "estimate">
                    <p class="createdEstimatedTime">${task.estimatedTime}min <p>
                </div>
            </nav>
        </li>

    </ul>
    `;



//   item.innerHTML = "<p>" + task.description + "</p>";
  //shows only 30 characters
  task.description = task.description.substring(0, 30) + "...";

  //append element to get new elements to the DOM
  tasklist.appendChild(item);
  item.classList.add("materialAssigned");
  // task created can be draggable
  item.setAttribute("draggable", "true");

  //item will be placed within the columns
  tasksColumn.appendChild(item);

  // task created by user can be dropped in other columns
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);


  function clickCreatedTask() {
    let createdTask = document.createElement("div");
    createdTask.setAttribute("id", "createdTask")
  }

  
  
  //add user interactions to the elements
  //extra task DOM elements - eg. deleting a task that was created by mistake
  // let delButton = document.createElement("div");
  //text node
  // delButton.innerHTML = '&times;';
  // delButton.setAttribute("class", "deleteTask");

  let delButton = document.createElement("button");
  // //text node
  let delButtonText = document.createTextNode("Delete");
  delButton.appendChild(delButtonText);

  
  //delete button to appear on screen after a task is created
  item.appendChild(delButton);

  //Event listeners for the DOM elements
  //task will be deleted when 'delete' button is clicked
//   button will always correspond to the item that they are next to
  delButton.addEventListener("click", function(event){
    event.preventDefault();
    // check code to delete from id
    let id = event.target.parentElement.getAttribute("data-id");
    let index = taskListArray.findIndex(task => task.id === Number(id));
    removeItemFromArray(taskListArray, index)
    console.log(taskListArray);
    updateEmpty();
    item.remove(); //delete/remove item from the DOM
  })

 //Once the form is submitted the form is cleared
 materialForm.reset();
}

function removeItemFromArray(arr, index) {
    if(index > -1){
        arr.splice(index, 1)
    }
    return arr;
}

// if a task is created the text ("Start by adding a new task!") will disappear
function updateEmpty(){
    if(taskListArray.length > 0) {
        document.getElementById("emptyTaskList").style.display = "none";
    } else {
        document.getElementById("emptyTaskList").style.display = "block";
    }
}
