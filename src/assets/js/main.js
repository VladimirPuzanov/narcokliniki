//Зафиксировать тело(да-да, вкусы специфичны, знаю)
function lockBody(){
	if(!document.querySelector("body")?.classList.contains("lock")){
		document.querySelector("body")?.classList.add("lock")
	}
}

function unlockBody(){
	if(document.querySelector("body")?.classList.contains("lock")){
		document.querySelector("body")?.classList.remove("lock")
	}
}

//Флаг фиксации тела
let bodyIsLock = false

//Управление бургерами(Звучит как новое место работы Якова)
const burger = document.querySelector(".header__burger")
const headerMenu = document.querySelector(".header__menu")
if(burger && headerMenu && !window.matchMedia("(min-width: 1024px)").matches){
	burger.addEventListener("click", ()=>{
		if(headerMenu.classList.contains("active")){
			unlockBody()
		} else{
			lockBody()
		}
		headerMenu.classList.toggle("active")
	})
}