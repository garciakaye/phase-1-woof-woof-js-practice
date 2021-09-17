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


function getDogType(isGoodDog){
    return isGoodDog ? 'Good Dog!' : 'Bad Dog!'
}


//this function creates the elements in the dog summary
function createDisplayElements(dog){
    const image = document.createElement('img')
    const heading = document.createElement('h2')
    const button = document.createElement('button') 
    image.setAttribute('src',dog.image)
    heading.innerText = dog.name
    button.innerText = getDogType(dog.isGoodDog)   
    return [image, heading, button]
}

function createTitle(dog){
    const {name} = dog
    const element = document.createElement('span')
    element.innerText = name
    return element
}

function renderNavBar(dogs){
    const titleContainer = document.getElementById('dog-bar')
    const displayContainer = document.getElementById('dog-info')

    titleContainer.innerHTML = '' 
    dogs.forEach((dog) => {
        /*
            each dog will be:
             {
                "id": 1,
                "name": "Mr. Bonkers",
                "isGoodDog": true,
                "image": "https://curriculum-content.s3.amazonaws.com/js/woof-woof/dog_1.jpg"
            },
        */
        const title = createTitle(dog)

        titleContainer.appendChild(title)
    
        title.addEventListener('click',() => {
            displayContainer.innerHTML = ''
            const elements = createDisplayElements(dog)
            
            const button = elements[2]
           
            elements.forEach((element) => {
                displayContainer.appendChild(element)
            })
    
            button.addEventListener('click',() => {
                patchPups(dog.id, {isGoodDog:!dog.isGoodDog}).then((data) => {
                  button.innerText = getDogType(data.isGoodDog)
                }) 
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
                renderNavBar(goodDogData)
            })
        }else{
            fetchPups().then((allDogData) => {
                renderNavBar(allDogData)
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
        -> new state: ui loads spans with dog names (adds click events to create sumary display)
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