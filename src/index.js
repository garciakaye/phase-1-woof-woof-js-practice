//DOM Render functions
function renderOnePup(pup){
    //Build pup
    let newSpan = document.createElement('span');
    document.getElementById('dog-bar').appendChild(newSpan);
    let textBox = document.createElement('input');
    textBox.innerText = 'Mr. Bonkers'
    // card.innerText = 'Mr. Bonkers'
    console.log(textBox)

    


}




//Fetch Requests
//Get Fetch for all pup resources
function getAllPups(){
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(pupData => pupData.forEach(pup => renderOnePup(pup)))
}


// Initial Render
// Get Data and Render our Animals to the DOM

function initialize(){
    //pupData.forEach(pup => renderOnePup(pup))
    getAllPups()
    //console.log('after get All Pups')
}

initialize()