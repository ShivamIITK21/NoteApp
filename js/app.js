showNotes();

// adding to local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function(e){
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    if(addTxt.value != "" && addTitle.value != ""){
        if(notes == null && titles == null){
            notesObj = [];
            titlesObj = [];
        }
        else{
            notesObj = JSON.parse(notes);
            titlesObj = JSON.parse(titles);
        }
        notesObj.push(addTxt.value);
        titlesObj.push(addTitle.value);
        localStorage.setItem("notes",JSON.stringify(notesObj));
        localStorage.setItem("titles", JSON.stringify(titlesObj));
        addTxt.value = "";
        addTitle.value = "";
        showNotes();
    }
    else{
        alert("Please fill title and note!");
    }
})

// showing the note
function showNotes(){
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    if(notes == null && titles == null){
        notesObj = [];
        titlesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
        titlesObj = JSON.parse(titles);
    }
    let html = ``;
    notesObj.forEach(function(element, index){
        html += `
            <div class="card my-2 mx-2 noteCard" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${titlesObj[index]}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
    });
    let notesElm = document.getElementById('notes');
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Add a Note`;
    }
}

// deleting the note
function deleteNote(index){
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    if(notes == null && titles == null){
        notesObj = [];
        titlesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
        titlesObj = JSON.parse(titles);
    }
    notesObj.splice(index,1);
    titlesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("titles", JSON.stringify(titlesObj));
    showNotes();
}

// searching for notes
let search = document.getElementById('searchTxt');
search.addEventListener('input', function(){
    let inputVal = search.value;
    // console.log('input taken', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        let cardTitle = element.getElementsByTagName('h5')[0].innerText;
        if(cardTxt.includes(inputVal) || cardTitle.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
})
