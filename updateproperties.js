export function getcustomproperty(ele, prop){
    return parseFloat(getComputedStyle(ele).getPropertyValue(prop)) || 0
}

export function setcustomproperty(ele, prop, value){
    ele.style.setProperty(prop,value)
}

export function incrementcustomproperty(ele,prop, increment){
    setcustomproperty(ele,prop, getcustomproperty(ele,prop)+increment)
}