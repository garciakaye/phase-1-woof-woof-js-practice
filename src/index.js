const HOST = 'http://localhost:3000'
const PUPS_ROUTE = `${HOST}/pups`
const GOOD_DOGS_FILTER = `${PUPS_ROUTE}?isGoodDog=true`

//This function only fetch's pup data
function fetchPups(address = PUPS_ROUTE){
    return fetch(address)
    .then((response) => response.json())
}
//This function sends a request to update database
function patchPups(id,body, address = PUPS_ROUTE){
    return fetch(`${address}/${id}`,{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(body)
    }).then((response) => response.json())
    .catch((error) => {
        console.log("ERROR", error)
    })
}

function fetchGoodDogs(){
    return fetch(address = GOOD_DOGS_FILTER)
    .then((response) => response.json())
}

function fetchPup(id){
    return fetch(`${PUPS_ROUTE}/${id}`).then((response) => response.json())
}


function getDogType(isGoodDog){
    return isGoodDog ? 'Good Dog!' : 'Bad Dog!'
}


//this function creates the elements in the dog summary
function createDogSummaryElements(dog){
    const image = document.createElement('img')
    const heading = document.createElement('h2')
    const button = document.createElement('button') 
    image.setAttribute('src',dog.image)
    heading.innerText = dog.name
    button.innerText = getDogType(dog.isGoodDog)   
    return [image, heading, button]
}

function createTitleElement(dog){
    const {name} = dog
    const element = document.createElement('span')
    element.innerText = name
    return element
}

function setDisplay(dog){
    const container = document.getElementById('dog-info')
    container.innerHTML = ''
    const summaryElements = createDogSummaryElements(dog)
    summaryElements.forEach((child) => {
        container.appendChild(child)
    })

    const button = summaryElements[2]

    button.addEventListener('click',() => { 
         fetchPup(dog.id).then((data) => {
            const {isGoodDog,id} = data
            patchPups(id, {isGoodDog:!isGoodDog}).then((updatedDog) => {
                button.innerText = getDogType(updatedDog.isGoodDog)
            }) 
        })
       
    })
}

function setNavBar(dogs){
    const container = document.getElementById('dog-bar')
    container.innerHTML = '' 
    dogs.forEach((dog) => {
        const title = createTitleElement(dog)
        container.appendChild(title)

        title.addEventListener('click',(event) => {
            fetchPup(dog.id).then((data) => {
                setDisplay(data)
            })
        })
    })
}

function getDogFilterText(isFiltered){
    return isFiltered ? 'Filter good dogs: ON' : 'Filter good dogs: OFF'
}




function initialize(){
    const filterButton = document.getElementById('good-dog-filter')
    let isFiltered = false
    // render function contains if statement if filter is enabled
    function render(){
       
        if(isFiltered){
            fetchGoodDogs().then((goodDogData) => {
                setNavBar(goodDogData)
            })
        }else{
            fetchPups().then((allDogData) => {
                setNavBar(allDogData)
            })
        }
    }



    filterButton.addEventListener('click',(event) => {
        isFiltered = !isFiltered
        filterButton.innerText = getDogFilterText(isFiltered)
       render()
    })

   render()
}


initialize()


/* initial state 
-> side effect (fetch pups) 
    -> success 
        -> new state: ui loads spans with dog names (adds click events to create summary display)
            -> side effect (click button, send request based id)
                -> success
                    -> new state: update display with pertinent info about dog
                -> failure
                    -> new state: show error message
    -> failure 
        -> new state: display an error in ui
-> side effect (click filter button)
    -> success 
        -> new state: ui is updated with good dogs
    -> failure
        -> new state: show an error 
    
                    

*/