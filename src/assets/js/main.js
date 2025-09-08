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

//Карта яндекса
let mapObj = false

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
				counterAnimate(entry.target, 0, stop, 250)
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

schedule = document.querySelector(".clinic-intro__schedule-wrapper")
if (schedule) {
	schedule.addEventListener("click", () => {
		schedule.classList.toggle("active")
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

	renderPagination() {
		this.pagination.innerHTML = ""
		for (let i = 1; i <= this.lastPage; i++) {
			let element = document.createElement("span")
			element.classList.add("swiper-pagination-bullet")
			if (i == this.page) {
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

//Слайдер цифр
aboutDigistSwiper = new Swiper(document.querySelector('.about-digits__swiper'), {
	direction: 'horizontal',
	initialSlide: 1,
	slidesPerView: 1.1,
	grabCursor: true,
	centeredSlides: true,
	spaceBetween: 10,
	pagination: {
		el: ".about-digits__pagination"
	},
	breakpoints: {
		1024: {
			direction: 'horizontal',
			slidesPerView: 1.8,
			spaceBetween: 25,
		},
		1420: {
			slidesPerView: 2.4,
			direction: "vertical",
			spaceBetween: 25,
		}
	}
});

ctabsTabSwiper = new Swiper(document.querySelector(".ctabs__mini"), {
	spaceBetween: 0,
	slidesPerView: "auto",
	freeMode: true,
})

ctabsContentSwiper = new Swiper(document.querySelector(".ctabs__content"), {
	spaceBetween: 5,
	thumbs: {
		swiper: ctabsTabSwiper,
		autoHeight: true,
	},
	allowTouchMove: false,
	autoHeight: true,
})

cLicense = new Swiper(document.querySelector(".c-license__col_license.swiper"), {
	spaceBetween: 15,
	slidesPerView: 1.1,
	navigation: {
		nextEl: document.querySelector(".c-license__button_next"),
		prevEl: document.querySelector(".c-license__button_back")
	},
	pagination: {
		el: ".c-license__pagination"
	},
	breakpoints: {
		1024: {
			slidesPerView: 2,
			spaceBetween: 25,
		},
	}
})

function toggleClassOnScroll(element, topFixed) {
	const parent = element.parentElement;
	let bottomLine = 0
	let isTopFixed = false
	let isBottomFixed = false

	function checkPosition() {
		const elementRect = element.getBoundingClientRect()
		const parentRect = parent.getBoundingClientRect()
		if (elementRect.top <= parentRect.top && isTopFixed) {
			element.classList.remove("top-fixed")
			isTopFixed = false
		}
		if (elementRect.top <= topFixed && !isTopFixed && !isBottomFixed) {
			element.classList.add("top-fixed")
			isTopFixed = true
		}
		if (elementRect.bottom > parentRect.bottom) {
			element.classList.remove("top-fixed")
			element.classList.add("bottom-fixed")
			isTopFixed = false
			isBottomFixed = true
		}
		if (isBottomFixed && elementRect.top > topFixed + 1) {
			element.classList.remove("bottom-fixed")
			isBottomFixed = false
		}
	}

	window.addEventListener('scroll', checkPosition);
	checkPosition();
}

const fixedCol = document.querySelector(".fixed-col")
if (fixedCol) {
	toggleClassOnScroll(fixedCol, 120)
}

document.addEventListener("DOMContentLoaded", function () {
	function popupClose(popupActive) {
		popupActive.classList.remove('open');
		setTimeout(() => {
			popupActive.classList.contains("open") || popupActive.classList.remove("active");
		}, 400);
		if (mapObj) {
			mapObj.destroy()
			mapObj = false
		}
		unlockBody()
	}
	const popupOpenBtns = document.querySelectorAll('.popup-btn');
	const popups = document.querySelectorAll('.popup');
	const closePopupBtns = document.querySelectorAll('.close-popup');
	closePopupBtns.forEach(function (el) {
		el.addEventListener('click', function (e) {
			popupClose(e.target.closest('.popup'));
		});
	});
	if (popups.length > 0) {
		popups.forEach(function (popup) {
			popupClose(popup);
			popup.addEventListener('click', function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		});
	}
	popupOpenBtns.forEach(function (el) {
		let coords
		el.addEventListener('click', function (e) {
			e.preventDefault();
			const path = e.currentTarget.dataset.path;
			if(path == "popup-map"){
				coords = e.currentTarget.dataset.coords
				coords = coords.split(",")
			}
			const currentPopup = document.querySelector(`[data-target="${path}"]`);
			if (currentPopup) {
				currentPopup.classList.add('active');
				setTimeout(() => {
					currentPopup.classList.add("open");
				}, 10);

				if (currentPopup.getAttribute("data-target") == 'popup-change') {
					let currentItem = el.closest('.change-item');
					let originalTop = currentPopup.querySelector('.original-title');
					let title = currentItem.querySelector('.change-title');
					let subtitle = currentItem.querySelector('.change-subtitle');
					if (title && subtitle) {
						var newTitle = title.innerHTML + ' ' + subtitle.innerHTML;
					} else if (title) {
						var newTitle = title.innerHTML;
					} else {
						var newTitle = subtitle.innerHTML;
					}
					if (el.classList.contains('change-doctor')) {
						newTitle = 'Записаться на приём к врачу: ' + newTitle;
					}
					originalTop.innerHTML = newTitle;
				};
				if (currentPopup.getAttribute("data-target") == 'popup-map') {
					loadMap(coords)
				}
				lockBody()
			}
		});
	});
});

/* yandex map */
const map = document.querySelectorAll('#map');
function loadMap(coords) {
	if (!document.querySelector('[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
		script.onload = function() {
            initMap(coords);
        };;
		document.head.appendChild(script);
	} else {
		initMap(coords);
	}
}
function initMap(coords) {
	ymaps.ready(function () {
		const myMap = new ymaps.Map('map', {
			center: coords,
			zoom: 16,
			controls: []
		});
		const myPlacemark = new ymaps.Placemark(
			coords,
			{
				hintContent: '',
				balloonContent: ''
			},
		);
		myMap.geoObjects.add(myPlacemark);
		myMap.behaviors.disable(['scrollZoom']);
		mapObj = myMap
	});
}