// add task button
let AddTaskBtn = document.getElementsByClassName('add-task')[0];
//all the tasks
let TaskContainer = [...document.getElementsByClassName('ToDo-container')];
// check icon 
let CheckIcon = [...document.getElementsByClassName('complete')];
// delete icons 
let DeletIcons = [...document.getElementsByClassName('link')];
//edit icons
let EditIicons = [...document.getElementsByClassName('edit-icon')];



DeleteButtons()
Hover();
DoneTask();
EditIicon();


// add task button listner
let submitTask = document.getElementsByClassName('submit-task')[0];
submitTask.addEventListener('click' , function(e){
    e.preventDefault();
    AddTask();
}) 
function DeleteButtons(){
    DeletIcons.forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.remove();
            let TaskTitle = button.parentElement.getElementsByClassName('title')[0].innerHTML;
            let TaskDec = button.parentElement.getElementsByClassName('discription')[0].innerHTML;
            let TaskDueDate = button.parentElement.getElementsByClassName('time')[0].innerHTML;
            // delete the task from local storage too;
            for(let i = 0; i < tasks.length;i++){
                // to loop through even when find null tasks.
                if(tasks[i] != null){
                    let title = tasks[i].title;
                    let dec = tasks[i].dec;
                    let dueDate = tasks[i].DueDate;
                    // to find the object we want to delete from tasks array and localstorage
                    if(TaskTitle == title && TaskDec == dec && TaskDueDate == dueDate){
                        tasks[i] = undefined; // delete if from tasks 
                        localStorage.TasksRecord = JSON.stringify(tasks); // update the local storage
                    }
                }


            }
        })
    })
}

// add task function

let tasks = [];
init()
function init(){
    // if there is a data in local storage in our Tasks records
    if(localStorage.TasksRecord){
        // re assign tasks array from local storage becuse it well be just an [] if we refresh the page 
        tasks = JSON.parse(localStorage.TasksRecord);
        // loop through the tasks array to display evrey task in the array to html 
        for(let i = 0; i < tasks.length;i++){
            // if there is a task
            if(tasks[i] != null){
                let title = tasks[i].title;
                let dec = tasks[i].dec;
                let dueDate = tasks[i].DueDate;
                let status = tasks[i].status;
                // display it to html
                DisplayToHtml(title,dec,dueDate,status)
            }
        }
        
    }
}

function AddTask(){
    
    let title = document.getElementById('title').value;
    let dec = document.getElementById('dec').value;
    let DueDate = document.getElementById('due-date').value; 

    // if the inputs is not empty 
    if(title && DueDate && dec){
        // create task object to save the task info to local storge from the tasks array
        let task = {
            title:title,
            dec:dec,
            DueDate:DueDate,
        };
        // push the new task to tasks array
        tasks.push(task);
        // make the local storage from tasks array
        localStorage.TasksRecord = JSON.stringify(tasks);
        // Display the task to html
        DisplayToHtml(title,dec,DueDate)
        
    }else alert('complete the data above');

}



// edit task function
function EditIicon(){
    // loop throush edit buttons to add event listner to it
    EditIicons.forEach( button => {
        button.addEventListener('click', () => {
            let task = button.parentElement;
            task.style.order = task.firstElementChild.style.order - 13;
            task.style.cssText += 'background-color:white; color:black;';    
            task.getElementsByClassName('edit-icon')[0].classList.add('hides');


            let title = task.getElementsByClassName('title')[0].textContent;
            let discription = task.getElementsByClassName('discription')[0].textContent;
            let dueDate = task.getElementsByClassName('time')[0].textContent;
            //creating object to compare with task form tasks array
            let obj = {title:title, dec:discription, DueDate:dueDate}
            tasks.forEach( task => {
                // if task exisects
                if(task != null){
                    // find the object ftom tasks array that whe want to edit
                    if(task.title == obj.title && task.dec == obj.dec && task.DueDate == obj.DueDate){
                        // make the status of the task unfineshed
                        task.status = false;
                        //update the local storage
                        localStorage.TasksRecord = JSON.stringify(tasks);
                    }
                }
            })

        });
    })

}


// complete task function

function DoneTask(){
    // loop through check icons to add event listner to it
    CheckIcon.forEach( button => {
    
        button.addEventListener('click', () =>{
            
            let task = button.parentElement;
            task.style.order = task.lastElementChild.style.order + 7;
            task.style.cssText += 'background-color:green; color:white;';
            task.getElementsByClassName('link')[0].classList.add('hides');
            button.classList.add('hides');
            task.getElementsByClassName('edit-icon')[0].classList.remove('hides');

            // data to store in object from the task in html it self to edit it in local storage
            let title = task.getElementsByClassName('title')[0].textContent;
            let discription = task.getElementsByClassName('discription')[0].textContent;
            let dueDate = task.getElementsByClassName('time')[0].textContent;
            
            // create object to compare with the object fromm tasks array to fint the task we want it ti be finshed
            let obj = {title:title, dec:discription, DueDate:dueDate}

            tasks.forEach( task => {
                // check if there is a task 
                if(task != null){
                    // findingthe task we want it to be finshed
                    if(task.title == obj.title && task.dec == obj.dec && task.DueDate == obj.DueDate){
                        // make it finshed
                        task.status = true;
                        //update the local storage 
                        localStorage.TasksRecord = JSON.stringify(tasks);
                    }
                }
            })
            
        })
    })
}





// add hover listner to hide and show buttons

function Hover() {
    // loop through every task container and add mouse listner to it to show and hide buttons
    TaskContainer.forEach(container => {
        container.addEventListener('mouseenter', function () {
            if(container.getElementsByClassName('edit-icon')[0].classList.contains('hides')){
                container.getElementsByClassName('complete')[0].classList.remove('hides');
                container.getElementsByClassName('link')[0].classList.remove('hides');
            }
           
        })
        container.addEventListener('mouseleave', function () {
            container.getElementsByClassName('complete')[0].classList.add('hides');
            container.getElementsByClassName('link')[0].classList.add('hides');
        })
    })

}



// open form pup-up function 
function openForm(){
    document.getElementsByClassName('container-toDO')[0].style.display = 'none';
    let PopUp = document.getElementsByClassName('pop-up')[0];
    PopUp.classList.remove('hides');
    document.getElementById("myForm").style.display = "block";
}

// close form pop-up function
  
  function closeForm(){
    document.getElementsByClassName('container-toDO')[0].style.display = 'block';
    let PopUp = document.getElementsByClassName('pop-up')[0];
    PopUp.classList.add('hides');
    document.getElementById("myForm").style.display = "none";
  }

  // add task to html from local storage or addtask function
function DisplayToHtml(title,dec,dueDate,status){
    let tasksContainer = document.getElementById('tasks-container');
    // make the html to append it to a new div
        let html = `
        <h3 class="title">${title}</h3>
        <h4 class="discription" >${dec}</h4>
        <h6 class="time">${dueDate}</h6>
        <h1 class="link hides">x</h1>
        <h1 class="complete hides"><span class="glyphicon glyphicon-ok"></span></h1>
        <i class="glyphicon glyphicon-edit edit-icon hides" style="font-size: 20px; position:absolute;top: 0; right: 0;"></i>
        `;
    // create a new div to store into it    
    let div = document.createElement('div');
    //some styles
    div.classList = 'ToDo-container list-group-item list-group-item-priamry';
    div.style.marginBottom = '20px';
    // append the html to the div
    div.innerHTML = html;

    // if there is no task but this task at top
    if(!tasksContainer.lastElementChild){
        div.style.order = 1 ;
    }else{ // else but it above the first task
        div.style.order = tasksContainer.lastElementChild.style.order - 13 ;
    }

    // check is status of the task from the local storage is finshed or not 
    if(status){
        div.style.order = div.lastElementChild.style.order + 7;
        div.style.cssText += 'background-color:green; color:white;'
        div.getElementsByClassName('link')[0].classList.add('hides');
        div.getElementsByClassName('complete')[0].classList.add('hides');
        div.getElementsByClassName('edit-icon')[0].classList.remove('hides');
    }

    // append the div and buttons to html or the buttons to there arrays 
    TaskContainer.unshift(div);
    tasksContainer.appendChild(div);
    CheckIcon.unshift(div.getElementsByClassName('complete')[0]);
    DeletIcons.unshift(div.getElementsByClassName('link')[0]);
    EditIicons.unshift(div.getElementsByClassName('edit-icon')[0]);

    // call these functions to add the listeners to the buttons
    DeleteButtons()
    Hover();
    DoneTask();
    EditIicon();
    closeForm();
}

