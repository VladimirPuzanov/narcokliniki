//Зафиксировать тело(да-да, вкусы специфичны, знаю)
function lockBody() {
	if (!document.querySelector("body")?.classList.contains("lock")) {
		document.querySelector("body")?.classList.add("lock")
	}
}

function unlockBody() {
	if (document.querySelector("body")?.classList.contains("lock")) {
		document.querySelector("body")?.classList.remove("lock")
	}
}

//Флаг фиксации тела
let bodyIsLock = false

//Управление бургерами(Звучит как новое место работы Якова)
const burger = document.querySelector(".header__burger")
const headerMenu = document.querySelector(".header__menu")
if (burger && headerMenu && !window.matchMedia("(min-width: 1024px)").matches) {
	burger.addEventListener("click", () => {
		if (headerMenu.classList.contains("active")) {
			unlockBody()
		} else {
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

function updateCounter(element, stop, increment) {
	if (parseInt(element.innerText) + increment > stop) {
		element.innerText = formatNumber(stop)
	} else {
		setTimeout(() => {
			element.innerText = (parseInt(element.innerText) + increment)
			updateCounter(element, stop, increment)
		}, 1);
	}
}

function counterAnimate(element, start, stop, time) {
	element.innerText = start;
	increment = Math.trunc((stop - start) / time)
	updateCounter(element, stop, increment)
}

const observer = new IntersectionObserver((entries) => {
	let animationDelay = 0;
	let width = 0;
	entries.forEach(entry => {
		if (entry.target.getAttribute("data-min-width")) {
			width = entry.target.getAttribute("data-min-width")
		}
		if (entry.isIntersecting && window.innerWidth > width) {
			if (entry.target.classList.contains("counter")) {
				stop = parseInt(entry.target.innerText.replaceAll(" ", ""))
				counterAnimate(entry.target, 0, stop, 200)
			}
			if (entry.target.classList.contains("animation-group")) {
				animationDelay = animationDelay + 100
				if (entry.target.getAttribute("data-delay")) {
					animationDelay = animationDelay + 100 + parseInt(entry.target.getAttribute("data-delay"))
				}
			} else if (entry.target.closest("animation-group")?.classList.contains("animated")) {
				animationDelay = 0;
				if (entry.target.getAttribute("data-delay")) {
					animationDelay = parseInt(entry.target.getAttribute("data-delay"))
				}
			}
			if (entry.target.getAttribute("data-delay")) {
				setTimeout(() => {
					entry.target.classList.add("animated")
				}, parseInt(entry.target.getAttribute("data-delay")));
				observer.unobserve(entry.target)
			} else {
				setTimeout(() => {
					entry.target.classList.add("animated")
				}, animationDelay);
				observer.unobserve(entry.target)
			}

		}
	});
}, {
	threshold: 0.1,
	rootMargin: '0px',
});

const animatedItems = document.querySelectorAll(".to_animate")

if (animatedItems.length > 0) {
	animatedItems.forEach(item => {
		observer.observe(item)
	})
}

//Слайдер с целями
advantagesSwiper = new Swiper(document.querySelector('.target__swiper'), {
	direction: 'horizontal',
	slidesPerView: 1.1,
	grabCursor: true,
	spaceBetween: 10,
	breakpoints: {
		510: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
	}
});

//Слайдер с клиниками
clinicsSwiper = new Swiper(document.querySelector('.best-clinics__swiper'), {
	direction: 'horizontal',
	slidesPerView: 1.1,
	grabCursor: true,
	spaceBetween: 10,
	navigation: {
		nextEl: document.querySelector(".best-clinics__button_next"),
		prevEl: document.querySelector(".best-clinics__button_back")
	},
	pagination: {
		el: ".best-clinics__pagination"
	},
	breakpoints: {
		510: {
			slidesPerView: 2.2,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 3.2,
			spaceBetween: 30,
		},
	}
});

class CastomSlider {
	constructor(slider, pagination, slidesOnPage, nextBtn, prevBtn) {
		this.slidesOnPage = slidesOnPage
		this.pagination = pagination
		this.status = true
		this.slidesOnPage = slidesOnPage
		this.page = 1
		this.slides = slider.querySelectorAll('.swiper-slide')
		this.lastPage = Math.ceil(this.slides.length / slidesOnPage)
		let i = 1
		this.slides.forEach(slide => {
			if (i > this.slidesOnPage) {
				slide.style.display = "none"
			}
			i++
		})
		this.nextPage = this.nextPage.bind(this)
		nextBtn.addEventListener("click", this.nextPage)
		this.prevPage = this.prevPage.bind(this)
		prevBtn.addEventListener("click", this.prevPage)
		this.renderPagination()
	}

	off() {
		if (this.status) {
			this.slides.forEach(slide => {
				slide.removeAttribute("style")
			})
			this.status = false
		}
	}

	on() {
		if (!this.status) {
			this.page = 1
			let i = 1
			this.slides.forEach(slide => {
				if (i > this.slidesOnPage) {
					slide.style.display = "none"
				}
				i++
			})
		}
		this.renderPagination()
		this.status = true
	}

	nextPage() {
		if (this.status && this.page != this.lastPage) {
			let start = this.page * this.slidesOnPage
			this.page = this.page + 1
			let end = this.page * this.slidesOnPage
			let i = 1;
			this.slides.forEach(slide => {
				if (i > start && i <= end) {
					setTimeout(() => {
						slide.removeAttribute("style")
					}, 510)
				} else {
					slide.classList.remove("animated")
					setTimeout(() => {
						slide.style.display = "none";
						observer.observe(slide)
					}, 500)
				}
				i++
			})
			this.renderPagination()
		}
	}

	prevPage() {
		if (this.status && this.page > 1) {
			this.page = this.page - 1
			let end = this.page * this.slidesOnPage
			let start = (this.page - 1) * this.slidesOnPage
			let i = 1;
			this.slides.forEach(slide => {
				if (i > start && i <= end) {
					setTimeout(() => {
						slide.removeAttribute("style")
					}, 510)
				} else {
					slide.classList.remove("animated")
					setTimeout(() => {
						slide.style.display = "none";
						observer.observe(slide)
					}, 500)
				}
				i++
			})
			this.renderPagination()
		}
	}

	renderPagination(){
		this.pagination.innerHTML = ""
		for(let i = 1; i <= this.lastPage; i++){
			let element = document.createElement("span")
			element.classList.add("swiper-pagination-bullet")
			if(i == this.page){
				element.classList.add("swiper-pagination-bullet-active")
			}
			this.pagination.append(element)
		}
	}
}

//Слайдер СМИ
smiSwiperCheck = document.querySelector(".smi__swiper");
if (smiSwiperCheck) {
	smiCastom = new CastomSlider(
		smiSwiperCheck,
		document.querySelector(".smi__pagination_castom"),
		3,
		document.querySelector(".smi__button-next"),
		document.querySelector(".smi__button-back")
	)
	smiSwiper = false;
	['resize', 'load'].forEach((event) => {
		window.addEventListener(event, function () {
			if (window.innerWidth < 1024 && !smiSwiper) {
				if (smiCastom.status) {
					smiCastom.off()
				}
				smiSwiper = new Swiper(document.querySelector('.smi__swiper'), {
					direction: 'horizontal',
					slidesPerView: 1,
					grabCursor: true,
					spaceBetween: 20,
					pagination: {
						el: ".smi__pagination"
					},
					breakpoints: {
						710: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
					}
				});
			}
			if (window.innerWidth >= 1024) {
				if (smiSwiper) {
					smiSwiper.destroy(true, true);
					smiSwiper = false
					smiSwiperCheck.classList.remove("swiper-backface-hidden")
				}
				if (!smiCastom.status) {
					smiCastom.on()
				}
			}
		})
	})
}

//Слайдер статей
articlesSwiper = new Swiper(document.querySelector('.articles__swiper'), {
	direction: 'horizontal',
	slidesPerView: 1.3,
	grabCursor: true,
	spaceBetween: 10,
	navigation: {
		nextEl: document.querySelector(".articles__button_next"),
		prevEl: document.querySelector(".articles__button_back")
	},
	pagination: {
		el: ".articles__pagination"
	},
	breakpoints: {
		650: {
			slidesPerView: 2.3,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 3.2,
			spaceBetween: 30,
		},
	}
});

aboutPrincSlider = new Swiper(document.querySelector('.about-princ__swiper'), {
	direction: 'horizontal',
	slidesPerView: 1.1,
	grabCursor: true,
	spaceBetween: 10,
	navigation: {
		nextEl: document.querySelector(".about-princ__button_next"),
		prevEl: document.querySelector(".about-princ__button_back")
	},
	pagination: {
		el: ".about-princ__pagination"
	},
	breakpoints: {
		650: {
			slidesPerView: 2.3,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 1,
			spaceBetween: 20,
		},
		1250: {
			slidesPerView: 1.4,
			spaceBetween: 20,
		},
	}
});