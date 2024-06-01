import {setground, updateground} from './ground.js'
import {getDinoRect, setdino, updatedino, setDinoLose} from './dino.js'
import {getCactusRects, setcactus, updatecactus} from './cactus.js'

const worldwidth = 100
const worldheight=30
const speed_scale_increase = 0.00001

const worldele = document.querySelector("[data-world]")
const scoreele = document.querySelector("[data-score]")
const startscreenele = document.querySelector("[data-start-screen]")

setpixeltoworldscale()
window.addEventListener('resize',setpixeltoworldscale)
document.addEventListener("keydown",handlestart, {once:true})

setground()

let lasttime
let speedscale
let score
function update(time){
    if(lasttime==null){
        lasttime=time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time-lasttime

    updateground(delta,speedscale)
    updatedino(delta, speedscale)
    updatecactus(delta, speedscale)
    updatespeedscale(delta)
    updatescore(delta)
    if(checklose()) return handleLose()

    lasttime=time
    window.requestAnimationFrame(update)
}

function checklose(){
    const dinorect = getDinoRect()
    return getCactusRects().some(rect=> iscollision(rect,dinorect))
}

function iscollision(rect1,rect2){
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function updatespeedscale(delta){
    speedscale += delta*speed_scale_increase
}

function updatescore(delta){
    score+=delta*0.01
    scoreele.textContent = Math.floor(score)
}

function handlestart(){
    lasttime=null
    speedscale=1
    score=0
    setground()
    setdino()
    setcactus()
    startscreenele.classList.add("hide")
    window.requestAnimationFrame(update)
}

function handleLose() {
    setDinoLose()
    setTimeout(() => {
      document.addEventListener("keydown", handlestart, { once: true })
      startscreenele.classList.remove("hide")
    }, 100)
  }

function setpixeltoworldscale(){
    let worldtopixelscale
    if(window.innerWidth/window.innerHeight < worldwidth/worldheight){
        worldtopixelscale = window.innerWidth/worldwidth
    } else{
        worldtopixelscale = window.innerHeight/worldheight
    }
    worldele.style.width = `${worldwidth*worldtopixelscale}px`
    worldele.style.height = `${worldheight*worldtopixelscale}px`
}