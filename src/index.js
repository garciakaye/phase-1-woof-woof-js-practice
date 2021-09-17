let db;
let areGoodDogsFiltered = false

//This function only fetch's pup data
function fetchPups(address = 'http://localhost:3000/pups'){
    return fetch(address)
    .then((response) => response.json())
}


// abstract helper function that will filter out the value of any key in an array of objects
function createFilter(conditionalFn){
    return (data) => {
        return data.filter((item) => {
            if(conditionalFn(item)){
                return item
            }
        },[])
    }
}








const findGoodDogs = createFilter((dog) => {
    return dog.isGoodDog
})

const findAllDogs = createFilter(() => true)

function getDogType(isGoodDog){
    return isGoodDog ? 'Good Dog!' : 'Bad Dog!'
}

function toggleDogType(dog){
    if(dog.isGoodDog){
        dog.isGoodDog = false
    }else{
        dog.isGoodDog = true
    }
}

function handleDogTypeClick(dog){
    return (event) => {
        toggleDogType(dog)
        event.target.innerText = getDogType(dog.isGoodDog)
    }
}

//this function creates the elements in the dog summary
function createDogSummaryElements(dog){
    const image = document.createElement('img')
    const name = document.createElement('h2')
    const button = document.createElement('button') 
    image.setAttribute('src',dog.image)
    name.innerText = dog.name
    button.innerText = getDogType(dog.isGoodDog)

    const handler = handleDogTypeClick(dog)
    button.addEventListener('click',handler)
   
    return [image, name, button]
}



function handlePupClick(dogData){
    return (event) => {
       
       const container = document.getElementById('dog-info')
       container.innerHTML = ""
        const children = createDogSummaryElements(dogData)
        children.forEach((child) => {
            container.appendChild(child)
        })
    

    }
}



function createDogTitleElement(dog){
    const element = document.createElement('span')
    element.innerText = dog.name
    const handler = handlePupClick(dog)
    element.addEventListener('click',handler)
   return element
}

function createDogTitles(dogs){
    const container = document.getElementById('dog-bar')
    container.innerHTML = ''
   dogs.forEach((dog) => {
    title = createDogTitleElement(dog)
    container.append(title)
   }) 
}

function createDogFilterHandler(dogs){
    return (event) => {
        if(areGoodDogsFiltered){
            const goodDogs = findGoodDogs(dogs)
            createDogTitles(goodDogs)
        }else{
            createDogTitles(dogs)
        }
        
    }
}

function initialize(){
    fetchPups()
    .then((dogs) => {
       db = [...dogs]


       createDogTitles(db)

       const dogFilterButton = document.getElementById('good-dog-filter')

       const handler = createDogFilterHandler(db)
       dogFilterButton.addEventListener('click', (event) => {
        createDogFilterHandler(db)
       })

       



        


        
    })
  

    









    //console.log('after get All Pups')
}


initialize()