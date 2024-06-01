import { getcustomproperty, incrementcustomproperty, setcustomproperty } from "./updateproperties.js"

const speed = 0.05
const groundele = document.querySelectorAll("[data-ground]")

export function setground(){
    setcustomproperty(groundele[0],"--left",0)
    setcustomproperty(groundele[1],"--left",300)
}

export function updateground(delta, speedscale){
    groundele.forEach(ground=>{
        incrementcustomproperty(ground,"--left",delta*speedscale*speed*-1)
        if(getcustomproperty(ground,"--left")<=-300){
            incrementcustomproperty(ground,"--left",600)
        }
    })
}