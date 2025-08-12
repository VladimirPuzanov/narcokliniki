const burger = document.querySelector(".header__burger")
const headerMenu = document.querySelector(".header__menu")
const body = document.querySelector("body")
if(burger && headerMenu && !window.matchMedia("(min-width: 1024px)").matches){
	burger.addEventListener("click", ()=>{
		headerMenu.classList.toggle("active")
		body.classList.toggle("lock")
	})
}