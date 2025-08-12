let burger=document.querySelector(".header__burger"),headerMenu=document.querySelector(".header__menu"),body=document.querySelector("body");burger&&headerMenu&&!window.matchMedia("(min-width: 1024px)").matches&&burger.addEventListener("click",()=>{headerMenu.classList.toggle("active"),body.classList.toggle("lock")});
//# sourceMappingURL=main.js.map
