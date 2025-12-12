let main = document.querySelector(".main")
let cusr = document.querySelector(".cursor")

main.addEventListener("mousemove",e =>{
  cusr.style.transform = `translate(${e.clientX}px,${e.clientY}px)`
})


let imgs= document.querySelectorAll(".image img")

imgs.forEach((img,index)=>{
  img.addEventListener("click",()=>{
    if((index + 1) % 2 !== 0){
        img.classList.add("gone-up")

    }
    else{
        img.classList.add("gone-down")
    }
  })
})