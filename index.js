import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalGrid = document.getElementById("meme-modal-grid")
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
const errorMessage = document.getElementById("error-message")

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', displayGallery)

memeModalGrid.addEventListener("click", (e)=>{
    const catImg = e.target.id
    const catAlt = e.target.alt
    renderCat(catImg, catAlt)
})

window.addEventListener("mouseup", (e)=>{
    if (!memeModal.contains(e.target)) {
        closeModal()
    }
})

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
    memeModalGrid.innerHTML = ""
    memeModalInner.innerHTML = ""
}

function renderCat(image, alt){
    memeModalGrid.innerHTML = ""
    memeModalInner.innerHTML = ""
    memeModalInner.innerHTML = `
        <img 
        class="cat-img"
        src="./images/${image}"
        alt="${alt}"
        >
        `
}

function displayGallery() {
    const catsArray = getMatchingCatsArray()
    if(document.querySelector('input[type="radio"]:checked')){
        errorMessage.textContent = ""
        memeModal.style.display = "flex"
        for (let catImage of catsArray) {
            memeModalGrid.innerHTML += `
                <img
                class="cat-img"
                id="${catImage.image}"
                src="./images/${catImage.image}"
                alt="${catImage.alt}"
                >
                `
        }
    } else {
        errorMessage.textContent = "Select an emotion"
    }
}

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)