import { getcustomproperty, incrementcustomproperty, setcustomproperty } from "./updateproperties.js"

const speed=.05
const cactusintervalmin = 500
const cactusintervalmax = 2000
const worldele = document.querySelector("[data-world]")

let nextcactustime
export function setcactus(){
    nextcactustime=cactusintervalmin
    document.querySelectorAll("[data-cactus]").forEach(cactus=>{
        cactus.remove()
    })
}

export function updatecactus(delta, speedscale){
    document.querySelectorAll("[data-cactus]").forEach(cactus=>{
        incrementcustomproperty(cactus,"--left",delta*speedscale*speed*-1)
        if(getcustomproperty(cactus,"--left")<= -100){
            cactus.remove()
        }
    })

    if(nextcactustime<=0){
        createcactus()
        nextcactustime=randomnumberbetween(cactusintervalmin,cactusintervalmax)/speedscale
    }
    nextcactustime-=delta
}

export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
      return cactus.getBoundingClientRect()
    })
  }

function createcactus(){
    const cactus = document.createElement("img")
    cactus.dataset.cactus=true
    cactus.src = "imgs/cactus.png"
    cactus.classList.add("cactus")
    setcustomproperty(cactus,"--left",100)
    worldele.append(cactus)
}

function randomnumberbetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

