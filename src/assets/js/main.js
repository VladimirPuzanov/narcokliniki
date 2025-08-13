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

//Анимации
function formatNumber(num) {
  return String(num)
    .replace(/\D/g, '') 
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function updateCounter(element, stop, increment){
	if(parseInt(element.innerText) + increment > stop){
		element.innerText = formatNumber(stop)
	} else {
		setTimeout(() => {
			element.innerText = (parseInt(element.innerText) + increment)
			updateCounter(element, stop, increment)
		}, 1);
	}
}

function counterAnimate(element, start, stop, time){
	element.innerText = start;
	increment = Math.trunc((stop - start) / time)
	updateCounter(element, stop, increment)
}

const observer = new IntersectionObserver((entries) => {
  let animationDelay = 0;
  entries.forEach(entry => {
    if (entry.isIntersecting) {
			if(entry.target.classList.contains("counter")){
				stop = parseInt(entry.target.innerText.replaceAll(" ", ""))
				counterAnimate(entry.target, 0, stop, 200)
			}
      if (entry.target.classList.contains("animation-group")) {
        animationDelay = animationDelay + 100
      } else if(entry.target.closest("animation-group")?.classList.contains("animated")){
        animationDelay = 0;
      }
      setTimeout(() => {
        entry.target.classList.add("animated")
      }, animationDelay);
      observer.unobserve(entry.target)
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '50px',
});

const animatedItems = document.querySelectorAll(".to_animate")

if (animatedItems.length > 0) {
  animatedItems.forEach(item => {
    observer.observe(item)
  })
}