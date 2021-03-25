function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}
/*
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
*/
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}

let unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================

// LettersAnimation
let title = document.querySelectorAll('._letter-animation');
if (title) {
	for (let index = 0; index < title.length; index++) {
		let el = title[index];
		let txt = el.innerHTML;
		let txt_words = txt.replace('  ', ' ').split(' ');
		let new_title = '';
		for (let index = 0; index < txt_words.length; index++) {
			let txt_word = txt_words[index];
			let len = txt_word.length;
			new_title = new_title + '<p>';
			for (let index = 0; index < len; index++) {
				let it = txt_word.substr(index, 1);
				if (it == ' ') {
					it = '&nbsp;';
				}
				new_title = new_title + '<span>' + it + '</span>';
			}
			el.innerHTML = new_title;
			new_title = new_title + '&nbsp;</p>';
		}
	}
}
//=================
//Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}
//=================
//Spollers
let spollers = document.querySelectorAll("._spoller");
if (spollers.length > 0) {
	for (let index = 0; index < spollers.length; index++) {
		const spoller = spollers[index];
		spoller.addEventListener("click", function (e) {
			if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
				return false;
			}
			if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
				return false;
			}
			if (spoller.closest('._spollers').classList.contains('_one')) {
				let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
				for (let i = 0; i < curent_spollers.length; i++) {
					let el = curent_spollers[i];
					if (el != spoller) {
						el.classList.remove('_active');
						_slideUp(el.nextElementSibling);
					}
				}
			}
			spoller.classList.toggle('_active');
			_slideToggle(spoller.nextElementSibling);
		});
	}
}
//=================
//Gallery
let gallery = document.querySelectorAll('._gallery');
if (gallery) {
	gallery_init();
}
function gallery_init() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		lightGallery(el, {
			counter: false,
			selector: 'a',
			download: false
		});
	}
}
//=================
//SearchInList
function search_in_list(input) {
	let ul = input.parentNode.querySelector('ul')
	let li = ul.querySelectorAll('li');
	let filter = input.value.toUpperCase();

	for (i = 0; i < li.length; i++) {
		let el = li[i];
		let item = el;
		txtValue = item.textContent || item.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			el.style.display = "";
		} else {
			el.style.display = "none";
		}
	}
}
//=================
//DigiFormat
function digi(str) {
	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
	return r;
}
//=================
//DiGiAnimate
function digi_animate(digi_animate) {
	if (digi_animate.length > 0) {
		for (let index = 0; index < digi_animate.length; index++) {
			const el = digi_animate[index];
			const el_to = parseInt(el.innerHTML.replace(' ', ''));
			if (!el.classList.contains('_done')) {
				digi_animate_value(el, 0, el_to, 1500);
			}
		}
	}
}
function digi_animate_value(el, start, end, duration) {
	var obj = el;
	var range = end - start;
	// no timer shorter than 50ms (not really visible any way)
	var minTimer = 50;
	// calc step time to show all interediate values
	var stepTime = Math.abs(Math.floor(duration / range));

	// never go below minTimer
	stepTime = Math.max(stepTime, minTimer);

	// get current time and calculate desired end time
	var startTime = new Date().getTime();
	var endTime = startTime + duration;
	var timer;

	function run() {
		var now = new Date().getTime();
		var remaining = Math.max((endTime - now) / duration, 0);
		var value = Math.round(end - (remaining * range));
		obj.innerHTML = digi(value);
		if (value == end) {
			clearInterval(timer);
		}
	}

	timer = setInterval(run, stepTime);
	run();

	el.classList.add('_done');
}
//=================
//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
			let popupForm = item.querySelector('form');
			if (popupForm) {
				popupForm.reset();
				let input = popupForm.querySelectorAll('input');
				for (let index = 0; index < input.length; index++) {
					const inp = input[index];
					inp.classList.remove('error');
				};
			}
			let popupVideo = item.querySelectorAll('iframe');
			if (popupVideo) {
				for (let index = 0; index < popupVideo.length; index++) {
					const popupVide = popupVideo[index];
					if ( popupVide ) {
						var iframeSrc = popupVide.src;
						popupVide.src = iframeSrc;
					}
				}
			}
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.which == 27) {
		popup_close();
	}
});
//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================
//Wrap
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
//========================================
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
//========================================
//Animate
function animate({ timing, draw, duration }) {
	let start = performance.now();
	requestAnimationFrame(function animate(time) {
		// timeFraction изменяется от 0 до 1
		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		// вычисление текущего состояния анимации
		let progress = timing(timeFraction);

		draw(progress); // отрисовать её

		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		}

	});
}
function makeEaseOut(timing) {
	return function (timeFraction) {
		return 1 - timing(1 - timeFraction);
	}
}
function makeEaseInOut(timing) {
	return function (timeFraction) {
		if (timeFraction < .5)
			return timing(2 * timeFraction) / 2;
		else
			return (2 - timing(2 * (1 - timeFraction))) / 2;
	}
}
function quad(timeFraction) {
	return Math.pow(timeFraction, 2)
}
function circ(timeFraction) {
	return 1 - Math.sin(Math.acos(timeFraction));
}
/*
animate({
	duration: 1000,
	timing: makeEaseOut(quad),
	draw(progress) {
		window.scroll(0, start_position + 400 * progress);
	}
});*/

//Полифилы
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
let iconMenuOn = document.querySelector(".header__icon_on");
let iconMenuOff = document.querySelector(".header__icon_off");

if (iconMenuOn != null) {
	let delay = 500;
	let menuBody = document.querySelector(".header__menu");
	iconMenuOn.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			menuBody.classList.add("_active");
		}
	});
	iconMenuOff.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			menuBody.classList.remove("_active");
		}
	});
	$('.header__link').on('click', function() {
		if (isMobile.any()) {
			if (unlock) {
				body_lock(delay);
				menuBody.classList.remove("_active");
			}
		}
	})
};




$('.portfolio__hide a').on('click', function(e) {
    e.preventDefault();
	$(this).toggleClass('_active');
	$('.portfolio__item_hide').toggleClass('_active');
	$('.portfolio__item_hide').toggleClass('fadeOut');
	$('.portfolio__item_hide').toggleClass('fadeIn');
});

const lightItems = document.querySelectorAll('.portfolio__item');




///////////////////////////// Sliders

$('.reviews__slider').slick({
	dots: true,
    arrows: true,
	infinite: true,
    slidesToShow: 5,
    centerMode: true,
    swipeToSlide: true,
	// variableWidth: true,
    prevArrow: '<div class="reviews__arrow reviews__arrow_prev"><svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.125 8.49995C18.125 8.8812 17.9735 9.24683 17.704 9.51642C17.4344 9.786 17.0687 9.93745 16.6875 9.93745L5.3025 9.93745L9.07833 13.7133C9.33225 13.9858 9.47049 14.3462 9.46392 14.7186C9.45735 15.091 9.30648 15.4464 9.04311 15.7097C8.77973 15.9731 8.42441 16.124 8.052 16.1305C7.67959 16.1371 7.31917 15.9989 7.04667 15.745L0.817501 9.51578C0.548303 9.24625 0.397098 8.88089 0.397098 8.49995C0.397098 8.11901 0.548303 7.75365 0.817501 7.48412L7.04667 1.25495C7.31917 1.00103 7.67959 0.862793 8.052 0.869364C8.42441 0.875935 8.77973 1.0268 9.04311 1.29017C9.30648 1.55355 9.45735 1.90887 9.46392 2.28128C9.47049 2.65369 9.33225 3.01411 9.07833 3.28662L5.3025 7.06245L16.6875 7.06245C17.0687 7.06245 17.4344 7.2139 17.704 7.48348C17.9735 7.75307 18.125 8.1187 18.125 8.49995Z" fill="black"/></svg></div>',
	nextArrow: '<div class="reviews__arrow reviews__arrow_next"><svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.875 8.49995C0.875 8.8812 1.02645 9.24683 1.29603 9.51642C1.56562 9.786 1.93125 9.93745 2.3125 9.93745L13.6975 9.93745L9.92167 13.7133C9.66775 13.9858 9.52951 14.3462 9.53608 14.7186C9.54265 15.091 9.69352 15.4464 9.95689 15.7097C10.2203 15.9731 10.5756 16.124 10.948 16.1305C11.3204 16.1371 11.6808 15.9989 11.9533 15.745L18.1825 9.51578C18.4517 9.24625 18.6029 8.88089 18.6029 8.49995C18.6029 8.11901 18.4517 7.75365 18.1825 7.48412L11.9533 1.25495C11.6808 1.00103 11.3204 0.862793 10.948 0.869364C10.5756 0.875935 10.2203 1.0268 9.95689 1.29017C9.69352 1.55355 9.54265 1.90887 9.53608 2.28128C9.52951 2.65369 9.66775 3.01411 9.92167 3.28662L13.6975 7.06245L2.3125 7.06245C1.93125 7.06245 1.56562 7.2139 1.29603 7.48348C1.02645 7.75307 0.875 8.1187 0.875 8.49995Z" fill="black"/></svg></div>',

	responsive: [
	  {
		breakpoint: 1550,
		settings: {
		  slidesToShow: 3,
		}
	  },
	  {
		breakpoint: 950,
		settings: {
	      centerMode: false,
		  slidesToShow: 3,
		  variableWidth: true,
		  arrows: false,
		}
	  },
	  {
		breakpoint: 700,
		settings: {
	      centerMode: false,
		  slidesToShow: 3,
		  variableWidth: true,
		  arrows: false,
		}
	  }
	  // You can unslick at a given breakpoint now by adding:
	  // settings: "unslick"
	  // instead of a settings object
	]
})


$(".clients__slider").slick({
    dots: true,
	prevArrow: '<div class="clients__arrow clients__arrow_prev"><svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.125 8.49995C18.125 8.8812 17.9735 9.24683 17.704 9.51642C17.4344 9.786 17.0687 9.93745 16.6875 9.93745L5.3025 9.93745L9.07833 13.7133C9.33225 13.9858 9.47049 14.3462 9.46392 14.7186C9.45735 15.091 9.30648 15.4464 9.04311 15.7097C8.77973 15.9731 8.42441 16.124 8.052 16.1305C7.67959 16.1371 7.31917 15.9989 7.04667 15.745L0.817501 9.51578C0.548303 9.24625 0.397098 8.88089 0.397098 8.49995C0.397098 8.11901 0.548303 7.75365 0.817501 7.48412L7.04667 1.25495C7.31917 1.00103 7.67959 0.862793 8.052 0.869364C8.42441 0.875935 8.77973 1.0268 9.04311 1.29017C9.30648 1.55355 9.45735 1.90887 9.46392 2.28128C9.47049 2.65369 9.33225 3.01411 9.07833 3.28662L5.3025 7.06245L16.6875 7.06245C17.0687 7.06245 17.4344 7.2139 17.704 7.48348C17.9735 7.75307 18.125 8.1187 18.125 8.49995Z" fill="black"/></svg></div>',
	nextArrow: '<div class="clients__arrow clients__arrow_next"><svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.875 8.49995C0.875 8.8812 1.02645 9.24683 1.29603 9.51642C1.56562 9.786 1.93125 9.93745 2.3125 9.93745L13.6975 9.93745L9.92167 13.7133C9.66775 13.9858 9.52951 14.3462 9.53608 14.7186C9.54265 15.091 9.69352 15.4464 9.95689 15.7097C10.2203 15.9731 10.5756 16.124 10.948 16.1305C11.3204 16.1371 11.6808 15.9989 11.9533 15.745L18.1825 9.51578C18.4517 9.24625 18.6029 8.88089 18.6029 8.49995C18.6029 8.11901 18.4517 7.75365 18.1825 7.48412L11.9533 1.25495C11.6808 1.00103 11.3204 0.862793 10.948 0.869364C10.5756 0.875935 10.2203 1.0268 9.95689 1.29017C9.69352 1.55355 9.54265 1.90887 9.53608 2.28128C9.52951 2.65369 9.66775 3.01411 9.92167 3.28662L13.6975 7.06245L2.3125 7.06245C1.93125 7.06245 1.56562 7.2139 1.29603 7.48348C1.02645 7.75307 0.875 8.1187 0.875 8.49995Z" fill="black"/></svg></div>',
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
	// variableWidth: true,
	speed: 800,
	responsive: [
		{
		  breakpoint: 1000,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 3,
		  }
		},
		// {
		//   breakpoint: 950,
		//   settings: {
		// 	centerMode: false,
		// 	slidesToShow: 3,
		// 	variableWidth: true,
		// 	arrows: false,
		//   }
		// },
		{
		  breakpoint: 750,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1,
			variableWidth: true,
			arrows: false,
		  }
		}
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	  ]
});

$(".popup-gallery__slider").slick({
    dots: true,
	prevArrow: '<div class="popup-gallery__arrow popup-gallery__arrow_prev"><svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.125 8.49995C18.125 8.8812 17.9735 9.24683 17.704 9.51642C17.4344 9.786 17.0687 9.93745 16.6875 9.93745L5.3025 9.93745L9.07833 13.7133C9.33225 13.9858 9.47049 14.3462 9.46392 14.7186C9.45735 15.091 9.30648 15.4464 9.04311 15.7097C8.77973 15.9731 8.42441 16.124 8.052 16.1305C7.67959 16.1371 7.31917 15.9989 7.04667 15.745L0.817501 9.51578C0.548303 9.24625 0.397098 8.88089 0.397098 8.49995C0.397098 8.11901 0.548303 7.75365 0.817501 7.48412L7.04667 1.25495C7.31917 1.00103 7.67959 0.862793 8.052 0.869364C8.42441 0.875935 8.77973 1.0268 9.04311 1.29017C9.30648 1.55355 9.45735 1.90887 9.46392 2.28128C9.47049 2.65369 9.33225 3.01411 9.07833 3.28662L5.3025 7.06245L16.6875 7.06245C17.0687 7.06245 17.4344 7.2139 17.704 7.48348C17.9735 7.75307 18.125 8.1187 18.125 8.49995Z" fill="black"/></svg></div>',
	nextArrow: '<div class="popup-gallery__arrow popup-gallery__arrow_next"><svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.875 8.49995C0.875 8.8812 1.02645 9.24683 1.29603 9.51642C1.56562 9.786 1.93125 9.93745 2.3125 9.93745L13.6975 9.93745L9.92167 13.7133C9.66775 13.9858 9.52951 14.3462 9.53608 14.7186C9.54265 15.091 9.69352 15.4464 9.95689 15.7097C10.2203 15.9731 10.5756 16.124 10.948 16.1305C11.3204 16.1371 11.6808 15.9989 11.9533 15.745L18.1825 9.51578C18.4517 9.24625 18.6029 8.88089 18.6029 8.49995C18.6029 8.11901 18.4517 7.75365 18.1825 7.48412L11.9533 1.25495C11.6808 1.00103 11.3204 0.862793 10.948 0.869364C10.5756 0.875935 10.2203 1.0268 9.95689 1.29017C9.69352 1.55355 9.54265 1.90887 9.53608 2.28128C9.52951 2.65369 9.66775 3.01411 9.92167 3.28662L13.6975 7.06245L2.3125 7.06245C1.93125 7.06245 1.56562 7.2139 1.29603 7.48348C1.02645 7.75307 0.875 8.1187 0.875 8.49995Z" fill="black"/></svg></div>',
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
	speed: 800,
	responsive: [
		{
		  breakpoint: 750,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
		  }
		}
	  ]
});


////////////////////////////// Sliders

$('select ').styler();
$('.checkbox__input').styler();

const button2 = document.querySelector('#form_btn_2');

const picker = datepicker('#picker', {
	formatter: (input, date, instance) => {
		const value = date.toLocaleDateString()
		input.value = value // => '1/1/2099'
	},
	onSelect: (instance, date) => {
		if (date) {
			button2.classList.add('_active');
		} else {
			button2.classList.remove('_active');
		}
	},
	startDay: 1,
	customDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
	customMonths: ['Январь ', 'Февраль ', 'Март ', 'Апрель', 'Май ', 'Июнь', 'Июль', 'Август', 'Сентябрь ', 'Октябрь ', 'Ноябрь', 'Декабрь '],
	minDate : new Date ()
})




////////////////////////////////////////////////////////////////////////////////// Валидация форм


jQuery.validator.addMethod("checkMask", function(value, element) {
	return /\+\d{1}\(\d{3}\)\d{3}-\d{4}/g.test(value); 
});

$('.input_phone').mask("+7(999)999-9999", {
	autoclear: false
});

const main_validate = $('#main_form').validate({
	rules: {
		work_size: {
			required: true,
			number: true,
		},
		date: {
			required: true,
		},
		phone: {
			required: true,
			checkMask: true
		},
		accept: {
			required: true,
		}
	},
	messages: {
		phone: "",
		accept: "",
	}
});

const pop_validate = $('#pop_form').validate({
	rules: {
		phone: {
			required: true,
			checkMask: true
		},
		accept: {
			required: true,
		}
	},
	messages: {
		phone: "",
		accept: "",
	}
});

////////////////////////////////////////////////////////////////////////////////// Валидация форм


////////////////////////////////////////////////////////////////////////////////// Активность кнопки квиза



const button1 = document.querySelector('#form_btn_1');
const input1 = document.querySelector('#work_size');

function inputChange(btn, input, e) {
	input.addEventListener(e, () => {
		if (input.value !== '') {
			btn.classList.add('_active');
		} else {
			btn.classList.remove('_active');
		}
	})
}


inputChange(button1, input1, 'input');



////////////////////////////////////////////////////////////////////////////////// Активность кнопки квиза





//////////////////////////////////////////////////////////////////////////////////////// Переключение страниц квиза



const formPages = document.querySelectorAll('.main-form__page_hide'),
      formBtns = document.querySelectorAll('.main-form__btn');

if (formPages) {
    for (let index = 0; index < formPages.length; index++) {
        let formPage = formPages[index];
        formPage.classList.add('fadeOut');
        formPages[0].classList.remove('fadeOut');
        formPages[0].classList.add('fadeIn');
    }
}

if (formBtns) {
    for (let index = 0; index < formBtns.length - 1; index++) {
        let formBtn = formBtns[index];
        formBtn.addEventListener('click', function (e) {
            let item = formBtn.getAttribute('href').replace('#', '');
            form_page_open(item);
            e.preventDefault();
        })
    }
}

function form_page_open(item) {
	let curent_page = document.getElementById(item);
    for (let index = 0; index < formPages.length; index++) {
        let formPage = formPages[index];
        formPage.classList.remove('fadeIn');
        formPage.classList.add('fadeOut');
        curent_page.classList.remove('fadeOut');
        curent_page.classList.add('fadeIn');
    }
}


//////////////////////////////////////////////////////////////////////////////////////// Переключение страниц квиза



"use strict"

const quiz_form = document.querySelector('#main_form');

if (quiz_form) {
	const form = quiz_form;
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();
		let formData = new FormData(form);
		form.classList.add('_sending');
		
		let error = 0;
		const inputs = form.querySelectorAll('input');
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			if (input.classList.contains('error')) {
				error++;
			}
			
		};

		if (error == 0) {
			let response = await fetch('mailer/sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				alert("Спасибо, скоро мы с вами свяжемся");
				for (let index = 0; index < formPages.length; index++) {
					let formPage = formPages[index];
					formPage.classList.add('fadeOut');
					formPages[0].classList.remove('fadeOut');
					formPages[0].classList.add('fadeIn');
				}
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}
	}
}




const pop_form = document.querySelector('#pop_form');

if (pop_form) {
	const form = pop_form;
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();
		let formData = new FormData(form);
		form.classList.add('_sending');
		
		let error = 0;
		const inputs = form.querySelectorAll('input');
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			if (input.classList.contains('error')) {
				error++;
			}
			
		};

		if (error == 0) {
			let response = await fetch('mailer/sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {

				const popup = document.querySelector('.popup');
				popup.classList.remove('_active');
				if (!document.querySelector('.menu__body._active')) {
					body_lock_remove(500);
				}
				history.pushState('', '', window.location.href.split('#')[0]);
				form.reset();
				alert("Спасибо, скоро мы с вами свяжемся");
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}
	}
}



let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}
let scr_body = document.querySelector('body');
let scr_blocks = document.querySelectorAll('._scr-sector');
let scr_items = document.querySelectorAll('._scr-item');
let scr_fix_block = document.querySelectorAll('._side-wrapper');
let scr_min_height = 750;

let scrolling = true;
let scrolling_full = true;

let scrollDirection = 0;

//ScrollOnScroll
window.addEventListener('scroll', scroll_scroll);
function scroll_scroll() {
	//scr_body.setAttribute('data-scroll', pageYOffset);
	let src_value = pageYOffset;
	let header = document.querySelector('header.header');
	if (src_value > 10) {
		header.classList.add('_scroll');
	} else {
		header.classList.remove('_scroll');
	}
	if (scr_blocks.length > 0) {
		for (let index = 0; index < scr_blocks.length; index++) {
			let block = scr_blocks[index];
			let block_offset = offset(block).top;
			let block_height = block.offsetHeight;

			if ((pageYOffset > block_offset - window.innerHeight / 1.5) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				block.classList.add('_scr-sector_active');
			} else {
				if (block.classList.contains('_scr-sector_active')) {
					block.classList.remove('_scr-sector_active');
				}
			}
			if ((pageYOffset > block_offset - window.innerHeight / 2) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				if (!block.classList.contains('_scr-sector_current')) {
					block.classList.add('_scr-sector_current');
				}
			} else {
				if (block.classList.contains('_scr-sector_current')) {
					block.classList.remove('_scr-sector_current');
				}
			}
		}
	}
	if (scr_items.length > 0) {
		for (let index = 0; index < scr_items.length; index++) {
			let scr_item = scr_items[index];
			let scr_item_offset = offset(scr_item).top;
			let scr_item_height = scr_item.offsetHeight;


			let scr_item_point = window.innerHeight - (window.innerHeight - scr_item_height / 3);
			if (window.innerHeight > scr_item_height) {
				scr_item_point = window.innerHeight - scr_item_height / 3;
			}

			if ((src_value > scr_item_offset - scr_item_point) && src_value < (scr_item_offset + scr_item_height)) {
				scr_item.classList.add('_active');
				scroll_load_item(scr_item);
			} else {
				scr_item.classList.remove('_active');
			}
			if (((src_value > scr_item_offset - window.innerHeight))) {
				if (scr_item.querySelectorAll('._lazy').length > 0) {
					scroll_lazy(scr_item);
				}
			}
		}
	}

	if (scr_fix_block.length > 0) {
		fix_block(scr_fix_block, src_value);
	}
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	if (custom_scroll_line) {
		let window_height = window.innerHeight;
		let content_height = document.querySelector('.wrapper').offsetHeight;
		let scr_procent = (pageYOffset / (content_height - window_height)) * 100;
		let custom_scroll_line_height = custom_scroll_line.offsetHeight;
		custom_scroll_line.style.transform = "translateY(" + (window_height - custom_scroll_line_height) / 100 * scr_procent + "px)";
	}

	if (src_value > scrollDirection) {
		// downscroll code
	} else {
		// upscroll code
	}
	scrollDirection = src_value <= 0 ? 0 : src_value;
}
setTimeout(function () {
	//document.addEventListener("DOMContentLoaded", scroll_scroll);
	scroll_scroll();
}, 100);

function scroll_lazy(scr_item) {
	let lazy_src = scr_item.querySelectorAll('*[data-src]');
	if (lazy_src.length > 0) {
		for (let index = 0; index < lazy_src.length; index++) {
			const el = lazy_src[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('src', el.getAttribute('data-src'));
				el.classList.add('_loaded');
			}
		}
	}
	let lazy_srcset = scr_item.querySelectorAll('*[data-srcset]');
	if (lazy_srcset.length > 0) {
		for (let index = 0; index < lazy_srcset.length; index++) {
			const el = lazy_srcset[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('srcset', el.getAttribute('data-srcset'));
				el.classList.add('_loaded');
			}
		}
	}
}

function scroll_load_item(scr_item) {
	if (scr_item.classList.contains('_load-map') && !scr_item.classList.contains('_loaded-map')) {
		let map_item = document.getElementById('map');
		if (map_item) {
			scr_item.classList.add('_loaded-map');
			map();
		}
	}
}

//FullScreenScroll
if (scr_blocks.length > 0 && !isMobile.any()) {
	disableScroll();
	window.addEventListener('wheel', full_scroll);
}
function full_scroll(e) {
	let viewport_height = window.innerHeight;
	if (viewport_height >= scr_min_height) {
		if (scrolling_full) {
			// ВЫЧИСЛИТЬ!!!
			let current_scroll = pageYOffset;//parseInt(scr_body.getAttribute('data-scroll'));
			//
			let current_block = document.querySelector('._scr-sector._scr-sector_current');
			let current_block_pos = offset(current_block).top;
			let current_block_height = current_block.offsetHeight;
			let current_block_next = current_block.nextElementSibling;
			let current_block_prev = current_block.previousElementSibling;
			let block_pos;
			if (e.keyCode == 40 || e.keyCode == 34 || e.deltaX > 0 || e.deltaY < 0) {
				if (current_block_prev) {
					let current_block_prev_height = current_block_prev.offsetHeight;
					block_pos = offset(current_block_prev).top;
					if (current_block_height <= viewport_height) {
						if (current_block_prev_height >= viewport_height) {
							block_pos = block_pos + (current_block_prev_height - viewport_height);
							full_scroll_to_sector(block_pos);
						}
					} else {
						enableScroll();
						if (current_scroll <= current_block_pos) {
							full_scroll_to_sector(block_pos);
						}
					}
				} else {
					full_scroll_pagestart();
				}
			} else if (e.keyCode == 38 || e.keyCode == 33 || e.deltaX < 0 || e.deltaY > 0) {
				if (current_block_next) {
					block_pos = offset(current_block_next).top;
					if (current_block_height <= viewport_height) {
						full_scroll_to_sector(block_pos);
					} else {
						enableScroll();
						if (current_scroll >= block_pos - viewport_height) {
							full_scroll_to_sector(block_pos);
						}
					}
				} else {
					full_scroll_pageend();
				}
			}
		} else {
			disableScroll();
		}
	} else {
		enableScroll();
	}
}
function full_scroll_to_sector(pos) {
	disableScroll();
	scrolling_full = false;
	_goto(pos, 800);

	let scr_pause = 500;
	if (navigator.appVersion.indexOf("Mac") != -1) {
		scr_pause = 1000;
	};
	setTimeout(function () {
		scrolling_full = true;
	}, scr_pause);
}
function full_scroll_pagestart() { }
function full_scroll_pageend() { }

//ScrollOnClick (Navigation)
let link = document.querySelectorAll('._goto-block');
if (link) {
	let blocks = [];
	for (let index = 0; index < link.length; index++) {
		let el = link[index];
		let block_name = el.getAttribute('href').replace('#', '');
		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}
		el.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body._active')) {
				menu_close();
				body_lock_remove(500);
			}
			let target_block_class = el.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 500, 98);
			e.preventDefault();
		})
	}

	window.addEventListener('scroll', function (el) {
		let old_current_link = document.querySelectorAll('._goto-block._active');
		if (old_current_link) {
			for (let index = 0; index < old_current_link.length; index++) {
				let el = old_current_link[index];
				el.classList.remove('_active');
			}
		}
		for (let index = 0; index < blocks.length; index++) {
			let block = blocks[index];
			let block_item = document.querySelector('.' + block);
			if (block_item) {
				let block_offset = offset(block_item).top;
				let block_height = block_item.offsetHeight;
				if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
					let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
					for (let index = 0; index < current_links.length; index++) {
						let current_link = current_links[index];
						current_link.classList.add('_active');
					}
				}
			}
		}
	})
}
//ScrollOnClick (Simple)
let goto_links = document.querySelectorAll('._goto');
if (goto_links) {
	for (let index = 0; index < goto_links.length; index++) {
		let goto_link = goto_links[index];
		goto_link.addEventListener('click', function (e) {
			let target_block_class = goto_link.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		});
	}
}
function _goto(target_block, speed, offset = 0) {
	let header = '';
	//OffsetHeader
	//if (window.innerWidth < 992) {
	//	header = 'header';
	//}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeOutQuad',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
}

//SameFunctions
function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, { passive: false }); // Disable scrolling in Chrome
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}
function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, { passive: false }); // Enable scrolling in Chrome
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}
function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}
function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}*/
}

function fix_block(scr_fix_block, scr_value) {
	let window_width = parseInt(window.innerWidth);
	let window_height = parseInt(window.innerHeight);
	let header_height = parseInt(document.querySelector('header').offsetHeight) + 15;
	for (let index = 0; index < scr_fix_block.length; index++) {
		const block = scr_fix_block[index];
		const block_width = block.getAttribute('data-width');
		const item = block.querySelector('._side-block');
		if (!block_width) { block_width = 0; }
		if (window_width > block_width) {
			if (item.offsetHeight < window_height - (header_height + 30)) {
				if (scr_value > offset(block).top - (header_height + 15)) {
					item.style.cssText = "position:fixed;bottom:auto;top:" + header_height + "px;width:" + block.offsetWidth + "px;left:" + offset(block).left + "px;";
				} else {
					gotoRelative(item);
				}
				if (scr_value > (block.offsetHeight + offset(block).top) - (item.offsetHeight + (header_height + 15))) {
					block.style.cssText = "position:relative;";
					item.style.cssText = "position:absolute;bottom:0;top:auto;left:0px;width:100%";
				}
			} else {
				gotoRelative(item);
			}
		}
	}
	function gotoRelative(item) {
		item.style.cssText = "position:relative;bottom:auto;top:0px;left:0px;";
	}
}

if (!isMobile.any()) {
	//custom_scroll();
	/*
	window.addEventListener('wheel', scroll_animate, {
		capture: true,
		passive: true
	});
	window.addEventListener('resize', custom_scroll, {
		capture: true,
		passive: true
	});
	*/
}
function custom_scroll(event) {
	scr_body.style.overflow = 'hidden';
	let window_height = window.innerHeight;
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	let custom_scroll_content_height = document.querySelector('.wrapper').offsetHeight;
	let custom_cursor_height = Math.min(window_height, Math.round(window_height * (window_height / custom_scroll_content_height)));
	if (custom_scroll_content_height > window_height) {
		if (!custom_scroll_line) {
			let custom_scroll = document.createElement('div');
			custom_scroll_line = document.createElement('div');
			custom_scroll.setAttribute('class', '_custom-scroll');
			custom_scroll_line.setAttribute('class', '_custom-scroll__line');
			custom_scroll.appendChild(custom_scroll_line);
			scr_body.appendChild(custom_scroll);
		}
		custom_scroll_line.style.height = custom_cursor_height + 'px';
	}
}

let new_pos = pageYOffset;
function scroll_animate(event) {
	let window_height = window.innerHeight;
	let content_height = document.querySelector('.wrapper').offsetHeight;
	let start_position = pageYOffset;
	let pos_add = 100;

	if (event.keyCode == 40 || event.keyCode == 34 || event.deltaX > 0 || event.deltaY < 0) {
		new_pos = new_pos - pos_add;
	} else if (event.keyCode == 38 || event.keyCode == 33 || event.deltaX < 0 || event.deltaY > 0) {
		new_pos = new_pos + pos_add;
	}
	if (new_pos > (content_height - window_height)) new_pos = content_height - window_height;
	if (new_pos < 0) new_pos = 0;

	if (scrolling) {
		scrolling = false;
		_goto(new_pos, 1000);

		let scr_pause = 100;
		if (navigator.appVersion.indexOf("Mac") != -1) {
			scr_pause = scr_pause * 2;
		};
		setTimeout(function () {
			scrolling = true;
			_goto(new_pos, 1000);
		}, scr_pause);
	}
	//If native scroll
	//disableScroll();
}

// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());