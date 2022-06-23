const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
const start = document.getElementById('start')
let score = 0
let startCount = 0
// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal


// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

const sound = new Audio("images/mole_smash.mp3")

function run(){
    if(score < 100){
        startCount += 1
        const i = Math.floor(Math.random() * holes.length)
        const hole = holes[i]
        let timer = null
    
        const img = document.createElement('img')
        img.classList.add('mole')
        img.src = 'images/mole.png'
    
        img.addEventListener('click', () => {
            score += 10
            sound.play()
            scoreEl.textContent = score
            img.src = 'images/mole-whacked.png'
            clearTimeout(timer)
            if(score == 100){
                modal.style.display= "block"
            }
            setTimeout(() => {
                hole.removeChild(img)
                run()
            }, 500)
        })
    
        hole.appendChild(img)
    
        timer = setTimeout(() => {
            hole.removeChild(img)
            startCount = 0
            run()
        }, 1500)
    }
    
}
start.addEventListener('click',()=>{
    if(startCount==0){
        run()
    }
    
})


window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})



// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}