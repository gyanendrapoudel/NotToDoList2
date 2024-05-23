let taskList = []
const handleSubmit=(e)=>{
 
 const newForm = new FormData(e)
 const task = newForm.get('task')
 const hr = +newForm.get('hr')
 let takenHr = totalHour()
 if(takenHr>167){
  return alert("You don't have any time available in this week")
 }
 taskList.push({
  hr,
  task,
  id:randomIdGenerator(),
  type:'entry'
 })
 
 document.querySelector('#task').value = ''
 document.querySelector("#hr").value=""

 displayEntryList()


}

const displayEntryList=()=>{
  const entryElm = document.getElementById("entryList")
  
  let entryList = taskList.filter((item)=>item.type==="entry")
  let str = ''
  entryList.map((item,i)=>{
    str+=` <tr>
                        <td class="">${i+1}</td>
                        <td class="">${item.task}</td>
                        <td class="">${item.hr}</td> 
                        <td class="text-end">
                            <button onclick="handleOnDelete('${item.id}')" class="btn btn-danger"><i class="fa-solid fa-trash "></i></button> 
                            <button  onclick="switchTask('${item.id}','bad')"class="btn btn-success" ><i class="fa-solid fa-arrow-right"></i></button>
                        </td>
                    </tr>`
  })
  
  entryElm.innerHTML=str
  totalHour()
 
}

// creating unique id function
const randomIdGenerator=()=>{
  let randomId =''
  const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"
  for(let i=0; i<6;i++){
    const randomIndex = Math.floor(Math.random()*str.length) 
    randomId+=str[randomIndex]
  }
  return randomId
}

// delete 
const handleOnDelete=(id)=>{
  if(window.confirm("Are you sure you want to delete this?")){
     taskList = taskList.filter((item) => item.id !== id)
     displayEntryList()
     displayBadList()
  }
 
}

// Switch 
const switchTask =(id, type)=>{
  taskList = taskList.map((item)=>{
    
    if(item.id===id){
      item.type=type
    }
    return item
  })
  
  displayEntryList();
  displayBadList()
  totalHour()
  
}



// displaying bad List 

const displayBadList = () => {
  const badElm = document.getElementById('badList')

  let badList = taskList.filter((item) => item.type === 'bad')
  let str = ''
  badList.map((item, i) => {
    str += ` <tr>
                        <td class="">${i + 1}</td>
                        <td class="">${item.task}</td>
                        <td class="">${item.hr}</td> 
                        <td class="text-end">
                            <button  onclick="switchTask('${ item.id}','entry')"class="btn btn-warning" ><i class="fa-solid fa-arrow-left"></i></button>
                            <button onclick="handleOnDelete('${item.id}')" class="btn btn-danger"><i class="fa-solid fa-trash "></i></button> 
                        </td>
                    </tr>`
  })

  badElm.innerHTML = str
  // displaying saved hour 
  document.getElementById('savedHour').textContent = badList.reduce((acc,item)=>acc+item.hr,0);
}

// total hour calculation function 

const totalHour = ()=>{
  const ttlHour = document.getElementById('totalHour')
  const ttlHr = taskList.reduce((acc,item)=>{return acc+item.hr},0)
  ttlHour.textContent=ttlHr
  return ttlHr

}