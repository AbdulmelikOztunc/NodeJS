getAll();

//Read
async function getAll(){
    const data = 
        await fetch("http://localhost:7000/api/getAll")
        .then(res=> res.json());

    const ulEl = document.querySelector("ul");
    let text = "";

    for(let i in data){
        text += `
            <li>
                <input value="${data[i].work}" id="input-${i}"> 
                <button class="btn btn-primary"  onclick="update(event)" data-id="${data[i]._id}" data-index="${i}">Update</button> 
                <button onclick="removeById(event)" data-id="${data[i]._id}">Remove</button>                      
            </li>`
    }

    ulEl.innerHTML = text;
}

//Create
const save = async () => {
   const inputEl = document.querySelector("input");
   const data = {value: inputEl.value};
   
   await fetch("http://localhost:7000/api/save", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"}
   }).then(res=>res.json());
   toastr.success("Record is successful");

   getAll();
   inputEl.value = "";
}        

//update
const update = async (event)=> {
    const id = event.target.dataset["id"];
    const index = event.target.dataset["index"];
    const value = document.getElementById("input-" + index).value;
    
    const data = {
        _id: id,
        value: value
    };

    await fetch("http://localhost:7000/api/update", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    })

    toastr.info("Update is successful");

    getAll();
}

//Remove
async function removeById(event){
    const id = event.target.dataset["id"];

    await fetch(`http://localhost:7000/api/removeById`,{
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({_id: id})
    }).then(res=>res.json());
    toastr.warning("Remove is successful");
    getAll();
}
