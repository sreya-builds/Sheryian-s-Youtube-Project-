function throttle(func, delay) {
  let lastCall = 0; 
return function(...args) {
    const now = Date.now(); 
    if (now - lastCall >= delay) {
      lastCall = now; 
      func.apply(this, args); 
    }
  };
}

let images = [
  "https://images.pexels.com/photos/1583582/pexels-photo-1583582.jpeg",
   "https://images.pexels.com/photos/2058498/pexels-photo-2058498.jpeg",
  "https://images.pexels.com/photos/34772495/pexels-photo-34772495.jpeg",
  "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg",
  "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg",
  "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg",
  "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg"
];
let lastX = 0;
let lastY = 0;

// ==========================
// POPCORN BURST FUNCTION
// ==========================
function createBurst(x, y, dirX, dirY) {

  const burstCount = 6;
  const gap = 60; // images ke beech distance

  for (let i = 0; i < burstCount; i++) {

    const div = document.createElement("div");
    div.classList.add("imagediv");

    div.style.left = x + "px";
    div.style.top = y + "px";

    const img = document.createElement("img");
    img.src = images[Math.floor(Math.random() * images.length)];
    div.appendChild(img);

    document.body.appendChild(div);

    const distance = gap * i;
    const offsetX = dirX * distance;
    const offsetY = dirY * distance;

    const tl = gsap.timeline({
  onComplete: () => div.remove()
});

tl.fromTo(
  img,
  {
    scale: 0.8,
    opacity: 0,
    force3D: true
  },
  {
    x: offsetX,
    y: offsetY,
    scale: 1.5,
    opacity: 1,
    duration: 5,        // slow entry
    ease: "power3.out"
  }
)
.to(img, {
  opacity: 1,
  duration: 4,         // 👈 hold time (image visible)
})
.to(img, {
  opacity: 0,
  scale:1.2,
  duration: 6,         // slow exit
  ease: "power2.in"
});

    // 🔥 safety cleanup (always good)
    setTimeout(() => {
      div.remove();
    }, 2000);
  }
}

document.querySelector(".center")
.addEventListener( "mousemove", throttle((e) => { 
  const dx = e.clientX - lastX; 
  const dy = e.clientY - lastY; 
  lastX = e.clientX; lastY = e.clientY;  
  const length = Math.sqrt(dx * dx + dy * dy) || 1;
   const dirX = dx / length; 
   const dirY = dy / length; 
   createBurst(e.clientX, e.clientY, dirX, dirY);
   }, 200))