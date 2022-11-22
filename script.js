
//  =====================button add task Moues over and mouse out===========
function changButton(idButton) {
  idButton.style.backgroundColor = "#d9ed92";
  idButton.style.borderRadius = "20px";
  idButton.style.transition = "all .5s";
  idButton.style.boxShadow = "5px 5px black";
}
//-------------------------------------------------
function outChangButton(idButton) {
  idButton.style = "default";
}

// ================ function prompt==========================
function getTitle(variable) {
  var title = prompt(`${variable} title`);
  return title;
}

function getDescription(variable) {
  var description = prompt(`${variable} details`);
  return description;
}
//=================== date Time======================
function getTime() {
  var history = new Date();
  var time = history.toLocaleTimeString();
  var year = history.toLocaleDateString();

  var yearTime = `${year} \n ${time}`;
  return yearTime;
}
// ================================ add Section in div task ======================

function setDataLocalStorage() {
  var title = getTitle("Enter");
  var  description = getDescription("Enter");
  var time = getTime();
 if(title ==''||title ==null||description==''||description==null)
 {
    alert("wrong")
 }
else{
   var task1 = [{ title: title }, { details: description }, { date: time },{color:""}];
  window.localStorage.setItem(`${title}`, JSON.stringify(task1));
  
  location.reload();
}

}
//================================getDataLocalStorage ========================
function getDataLocalStorage() {
  var values = Object.values(localStorage);
  
  for (var i = 0; i < values.length; i++) 
  {
    var Objects = JSON.parse(values[i]);
    
    createDivAndSection(Objects);
    
  }
  buttonDeleteAll(values);
  
}
  //=========================create section=========================
function createDivAndSection(Objects)
{
  var tasks = document.createElement("div");
  tasks.setAttribute("class","divTask")
  var parent = document.getElementById("parent");
  parent.appendChild(tasks);
  tasks.setAttribute("id",Objects[0]["title"])

  var staticTitle = ["Title", "Details", "Date"];
  var inputUser = [Objects[0].title,Objects[1]["details"],Objects[2]["date"],];
  for (let i = 0; i < 3; i++) {
    var sectionOne = document.createElement("section");
    sectionOne.setAttribute("class", "sectionOne");

    var h1Section = document.createElement("h2");
    // h1Section.setAttribute("class", "honeSectionOne");
    var textH1 = document.createTextNode(`${staticTitle[i]}`);

    var paraSection = document.createElement("p");
    // paraSection.setAttribute("class", "paraSectionOne");
    var textPara = document.createTextNode(`${inputUser[i]}`);

    h1Section.appendChild(textH1);
    paraSection.appendChild(textPara);
    sectionOne.appendChild(h1Section);
    sectionOne.appendChild(paraSection);

   tasks.appendChild(sectionOne)
    
  //  colorTask() 
   
}
iconInSection(tasks);
colorTaskDone(tasks);
getColor(tasks);

}
  //=======================Button clear all Local Storage===============
  function buttonDeleteAll(values){
  if (values.length > 0) {
    var parentButton = document.getElementById("addTaskButtonContainer");
    var buttonClear = document.createElement("button");
    buttonClear.setAttribute("id", "buttonClear");
    buttonClear.innerText = "clear All";
    parentButton.appendChild(buttonClear);
    document.getElementById("buttonClear").addEventListener("click", function () {
      var user=confirm("are your sure clear all tasks")
      if(user==true)
      {
        localStorage.clear();
        location.reload();
      }
      else
      {
        return ;
      }
    });
}
  }


//===========================Add Icons======================================


function iconInSection(task) {
  var sectionsIcon = document.createElement("section");

  var hSectionIcon = document.createElement("h2");
  var textH2 = document.createTextNode("Operation");

  var editTitle = document.createElement("i");
  editTitle.setAttribute("class", "fa-solid fa-file-pen");
  editTitle.setAttribute("title","Edit Title");

  editTitle.addEventListener("click",function(){
    var id = task.getAttribute("id");
    var editTitle=getTitle("edit");
if(editTitle==""||editTitle==null)
{
  alert("wrong") 
}else{
    var values = localStorage.getItem(id);
    var Objects = JSON.parse(values);
    var task1 = [{title:editTitle},{details:Objects[1].details},{date:Objects[2].date},{color:""}];
    window.localStorage.setItem(`${editTitle}`, JSON.stringify(task1));
    localStorage.removeItem(id);
  
    
  location.reload();
}
  })
//----------------------------------------------------------------
  var editDetails = document.createElement("i");
  editDetails.setAttribute("class", "fa-solid fa-marker");
  editDetails.setAttribute("title","Edit Details");
  editDetails.addEventListener("click",function() {
    var id = task.getAttribute("id");
    var newEdit=getDescription("Edit")
    if(newEdit==""||newEdit==null)
    { alert("wrong") ;   }
    else{
    var date=getTime();
    var task1 = [{ title: id }, { details: newEdit }, { date: date },{color:""}];
  window.localStorage.setItem(`${id}`, JSON.stringify(task1));
  location.reload();
    }
  })
//--------------------------remove one task--------------------------
  var remove = document.createElement("i");
  remove.setAttribute("class", "fa-solid fa-trash-can");
  remove.setAttribute("title", "Delete Task");
  remove.classList.add("delete");
  remove.addEventListener("click",function(){
   var out=confirm("are  you sure about removing?");
    if(out==true){
      var id = task.getAttribute("id");
      localStorage.removeItem(id);
      task.remove();
      location.reload();
    }
    else{return;}
    
    })


  hSectionIcon.appendChild(textH2);
  sectionsIcon.appendChild(hSectionIcon);
  sectionsIcon.appendChild(editTitle);
  sectionsIcon.appendChild(editDetails);
  sectionsIcon.appendChild(remove);
  

    task.appendChild(sectionsIcon);
  
}

//========================================Color task========================
function colorTaskDone(valueTask){

var editTitle = document.createElement("i");
editTitle.setAttribute("class", "fa-solid fa-circle-check");
editTitle.setAttribute("title", "Done Task");
valueTask.appendChild(editTitle)
editTitle.addEventListener("click",function(){
  var id = valueTask.getAttribute("id");
  var values = localStorage.getItem(id);
  var Objects = JSON.parse(values);
  var color="#74c69d";
  if(Objects[3].color=="")
  {
    
    var task1 = [{title:Objects[0].title},{details:Objects[1].details},{date:Objects[2].date},{color:color}];
    
    window.localStorage.setItem(`${id}`, JSON.stringify(task1));
    
  }else{
    
    var task1 = [{title:Objects[0].title},{details:Objects[1].details},{date:Objects[2].date},{color:""}];
    
    window.localStorage.setItem(`${id}`, JSON.stringify(task1));
  }
  
  
  location.reload();
  
})

}
//----------------------------------------------------
function getColor(valueTask)
{
  var id = valueTask.getAttribute("id");
  var values = localStorage.getItem(id);
  var Objects = JSON.parse(values);
  var colorLocal=Objects[3].color;
  var getId=document.getElementById(id)
  console.log(id)
  getId.style.backgroundColor=colorLocal;
  // location.reload();
}

