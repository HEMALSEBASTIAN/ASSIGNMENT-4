var flag=true;
var todoItems=[];
let i=0;
function initialize()
{
    if(flag)
    {
        $("#blur-1").css("display","block");
        $("#pop-1").css("display","none");
        $("#pop-2").css("display","none");
        $(".addedItemSpace").css("display","none");
    }
    else
    {
        $("#blur-1").css("display","block");
        $("#pop-1").css("display","none");
        $("#pop-2").css("display","none");
        $(".addedItemSpace").css("display","flex");
        if(todoItems.length==0)
            $("#No-items").css("display","block");
        else
            $("#No-items").css("display","none");
        flag=true;
    }
    if(todoItems.length==0)
    {
        $("#No-items").css("display","block");
    }
    else
    {
        $("#No-items").css("display","none");
    }
}
initialize();


function newAddTodo() {  //when 'AddList' is clicked
    if(flag)
    {
        $(".container1").css("filter","blur(7px)");
        $("#pop-1").css("display","block");
    }
}

function closeTodo(){  // to close the popup of adding new item
    $(".container1").css("filter","blur(0px)");
    flag=false;
    initialize();
}

function addTodo(){  // to add new item 
    const value = document.querySelectorAll('.mt-3.shadow1.text-center')[0].value;
    if(value=="")
    {
        $(".container1").css("filter","blur(0px)");
        flag=false;
        initialize();
    }
    else
    {
        console.log(value);
        const todo={
            key:Date.now(),
            heading:value,
            subTask:[]
        }
        todoItems.push(todo);
        document.querySelectorAll('.mt-3.shadow1.text-center')[0].value=""; //to clear previously added item name
        renderTodo();
    }
    
}

function renderTodo(){ //to render the newly added item on the screen
    
    $(".container1").css("filter","blur(0px)");
    var container =document.querySelector(".addedItemSpace");
    console.log(container);
    for(;i<todoItems.length;i++)
    {
        const node=document.createElement("div");
        node.setAttribute("data-key",todoItems[i].key);
        node.innerHTML=`
        <div class="mx-auto shadow1 container2" id="blur-2" >
            <div class="fs-2 mt-3">${todoItems[i].heading}</div>
            <hr  style="height: 2px; color: black; margin-top: 2px;">
            <div class="objective"></div>
            <div class="text-end pe-2">
                <button onclick="removeItem(this) "class="far fa-trash-alt fs-2 pe-1 button1" id="deleteBin"></button>
                <button onclick="addList(this) "class="fas fa-plus-circle fs-2 button1" id="secondCircle"></button>
            </div>
        </div>`;
        container.appendChild(node);
        console.log(node);
        console.log(node.getAttribute("data-key"));
    }
    flag=false;
    initialize();
}


function removeItem(event)  //to remove an item
{
    console.log(event.parentNode)
    console.log(event.parentNode.parentNode)
    console.log(event.parentNode.parentNode.parentNode)
    let id=event.parentNode.parentNode.parentNode;
    console.log(id);
    var container =document.querySelector(".addedItemSpace");
    container.removeChild(id);
    for(let j=0;j<todoItems.length;j++)
    {
        if(id.getAttribute("data-key")==todoItems[j].key)
        {
            console.log(todoItems[j]);
            todoItems.splice(j,1);
            i--;
        }
    }
    console.log(todoItems);
    flag=false;
    initialize();
}
var currentId;
function addList(event)  //to add a list to the already created item
{ 
    currentId=event.parentNode.parentNode.parentNode;
    console.log(currentId);
    $(".container1").css("filter","blur(7px)");
    $("#pop-2").css("display","block");
    document.querySelectorAll("#blur-2").forEach((item)=>{
        item.style.filter="blur(7px)";
    })
}

function addListItem(){
    const itemName=document.querySelectorAll(".mt-3.shadow1.text-center")[1].value;
    if(itemName!="")
    {
        console.log(itemName);
        document.querySelectorAll(".mt-3.shadow1.text-center")[1].value="";
        var obj=currentId.getAttribute("data-key");
        console.log(obj);
    
        for(let j=0;j<todoItems.length;j++)
        {
            if(todoItems[j].key==obj)
            {   
                const cont=document.querySelectorAll(".objective")[j];
                console.log(cont);
                const ulist={
                    key:Date.now(),
                    heading:itemName
                }
                todoItems[j].subTask.push(ulist)
                const node1=document.createElement("div");
                node1.setAttribute("data-key",ulist.key);
                node1.innerHTML=`
                <div class="objectiveItem style="margin-top: 1%;" >${itemName} <button type="button"  onclick="marked(this)" class="button3" >Mark</button></div>
                `
                cont.appendChild(node1);
                console.log(node1);
                console.log(todoItems[j].subTask);
            }
        }
    }
    $(".container1").css("filter","blur(0px)");
    $("#pop-2").css("display","none");
    document.querySelectorAll("#blur-2").forEach((item)=>{
        item.style.filter="blur(0px)";
    })
}

function closeListItem(){
    $(".container1").css("filter","blur(0px)");
    $("#pop-2").css("display","none");
    document.querySelectorAll("#blur-2").forEach((item)=>{
        item.style.filter="blur(0px)";
    })
    document.querySelectorAll(".mt-3.shadow1.text-center")[1].value="";
}

function marked(event){
    let id2=event.parentNode.parentNode.parentNode.parentNode.parentNode;
    let id3=event.parentNode.parentNode;
    console.log(id2.getAttribute("data-key"));
    console.log(id3.getAttribute("data-key"));
    for(let j=0;j<todoItems.length;j++)
    {
        if(todoItems[j].key==id2.getAttribute("data-key"))
        {
            const cont=document.querySelectorAll(".objective")[j];
            console.log(cont);
            
            console.log("id="+todoItems[j].key);
            for(let k=0;k<todoItems[j].subTask.length;k++)
            {
                if(todoItems[j].subTask[k].key==id3.getAttribute("data-key"))
                {
                    console.log("success");
                    console.log(cont.childNodes[k]);
                    cont.childNodes[k].innerHTML=`
                    <div class="Completed">&nbsp;${todoItems[j].subTask[k].heading}</div>
                    `
                    console.log(todoItems[j].subTask[k]);
                    console.log(todoItems[j]);
                }
            }
        }
    }
}


