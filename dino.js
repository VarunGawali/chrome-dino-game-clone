import { getcustomproperty, incrementcustomproperty, setcustomproperty } from "./updateproperties.js"

const dinoele = document.querySelector("[data-dino]")
const jumpspeed = .45
const gravity = .0015
const dinoframecount = 2
const frametime = 100

let isjumping
let dinoframe
let currentframetime
let yvelocity
export function setdino(){
    isjumping=false
    dinoframe=0
    currentframetime=0
    yvelocity=0
    setcustomproperty(dinoele,"--bottom",0)
    document.removeEventListener("keydown",onjump)
    document.addEventListener("keydown",onjump)
}

export function updatedino(delta, speedscale){
    handlerun(delta, speedscale)
    handlejump(delta)
}

export function getDinoRect() {
    return dinoele.getBoundingClientRect()
}

export function setDinoLose() {
    dinoele.src = "imgs/dino-lose.png"
}

function handlerun(delta, speedscale){
    if(isjumping){
        dinoele.src = 'imgs/dino-stationary.png'
        return
    }
    if(currentframetime >= frametime){
        dinoframe=(dinoframe+1)%dinoframecount
        dinoele.src = `imgs/dino-run-${dinoframe}.png`
        currentframetime-=frametime
    }
    currentframetime+=delta*speedscale
}

function handlejump(delta){
    if(!isjumping) return

    incrementcustomproperty(dinoele, "--bottom", yvelocity*delta)
    if(getcustomproperty(dinoele,"--bottom")<=0){
        setcustomproperty(dinoele,"--bottom",0)
        isjumping=false
    }
    yvelocity-=gravity*delta
}

function onjump(e){
    if(e.code!=="Space" || isjumping) return
    yvelocity = jumpspeed
    isjumping = true
}
