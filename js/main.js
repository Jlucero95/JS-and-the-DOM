const theme = "theme";
const dataTheme = "data-theme";
const themeTab = ".theme-tab";
const switcherBtn = ".switcher-btn";
const dark = "dark";
const light = "light";
const open = "open";
const active = "active";

const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";

const dataFilter = "[data-filter]";
const portfolioData = "[data-item]";

const root = document.documentElement;

// Theme
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

// Portfolio Card/ Modal Creator
const cards = [
	{
		imageSrc: "./assets/images/portfolio-1.jpg",
		category: "Web Development",
		title: "Food WebSite",
		dataItem: "web",
		dataOpen: "web-1",
	},
	{
		imageSrc: "./assets/images/portfolio-2.jpg",
		category: "Web Development",
		title: "Skate WebSite",
		dataItem: "web",
		dataOpen: "web-2",
	},
	{
		imageSrc: "./assets/images/portfolio-3.jpg",
		category: "Web Development",
		title: "Eating WebSite",
		dataItem: "web",
		dataOpen: "web-3",
	},
	{
		imageSrc: "./assets/images/portfolio-4.jpg",
		category: "UI Design",
		title: "Cool Design",
		dataItem: "ui",
		dataOpen: "ui-1",
	},
	{
		imageSrc: "./assets/images/portfolio-5.jpg",
		category: "App Development",
		title: "Game App",
		dataItem: "app",
		dataOpen: "app-1",
	},
	{
		imageSrc: "./assets/images/portfolio-6.jpg",
		category: "App Development",
		title: "Gambling App",
		dataItem: "app",
		dataOpen: "app-2",
	},
	{
		imageSrc: "./assets/images/portfolio-7.jpg",
		category: "App Development",
		title: "Money Design",
		dataItem: "app",
		dataOpen: "app-3",
	},
	{
		imageSrc: "./assets/images/portfolio-8.jpg",
		category: "UI Design",
		title: "Fantastic Design",
		dataItem: "ui",
		dataOpen: "ui-2",
	},
];
let newCardGrid = document.getElementById("grid");
function createCard(imageSrc, category, title, dataItem, dataOpen) {
	const card = `<div class="portfolio-card" data-item="${dataItem}" data-open="${dataOpen}">
                  <div class="card-body picture-issue">
                    <img src="${imageSrc}" alt="portfolio icon">
                    <div class="card-popup-box">
                      <div>${category}</div>
                      <h3>${title}</h3>
                    </div>
                  </div>
                </div>`;
	newCardGrid.insertAdjacentHTML("beforeend", card);
}
cards.map((card) =>
	createCard(
		card.imageSrc,
		card.category,
		card.title,
		card.dataItem,
		card.dataOpen
	)
);

// Modal Creator
const modalContent = [
	{
		id: "web-1",
		headOfModal: "Web Project 1",
		image: "../assets/images/portfolio-1.jpg",
	},
	{
		id: "web-2",
		headOfModal: "Web Project 2",
		image: "../assets/images/portfolio-2.jpg",
	},
	{
		id: "web-3",
		headOfModal: "Web Project 3",
		image: "../assets/images/portfolio-3.jpg",
	},
	{
		id: "app-1",
		headOfModal: "App Project 1",
		image: "../assets/images/portfolio-5.jpg",
	},
	{
		id: "app-2",
		headOfModal: "App Project 2",
		image: "../assets/images/portfolio-6.jpg",
	},
	{
		id: "app-3",
		headOfModal: "App Project 3",
		image: "../assets/images/portfolio-7.jpg",
	},
	{
		id: "ui-1",
		headOfModal: "Web Project 1",
		image: "../assets/images/portfolio-4.jpg",
	},
	{
		id: "ui-2",
		headOfModal: "Web Project 1",
		image: "../assets/images/portfolio-8.jpg",
	},
];

function createModal(id, headOfModal, image) {
	const modal = `<div id="${id}" class="modal" data-animation="slideInOutTop">
			<div class="modal-dialog">
				<header class="modal-header">
					<h3>${headOfModal}</h3>
						<i data-close="" class="fas fa-times"></i>
				</header>
				<div class="modal-body">
					<div class="img-wrapper">
						<img src="${image}" alt="portfolio image">
					</div>
					<div class="text-wrapper">
						<p><strong>My first awesome website</strong></p>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
						 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
					</div>
				</div>
			</div>
		</div>`;
	document.body.insertAdjacentHTML("beforeend", modal);
}
const modalCreator = document.createElement("div");
modalContent.map((modals) =>
	createModal(modals.id, modals.headOfModal, modals.image)
);

const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector("#search");

// Modal
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const setActive = (elm, selector) => {
	if (document.querySelector(`${selector}.${active}`) !== null) {
		document.querySelector(`${selector}.${active}`).classList.remove(active);
	}
	elm.classList.add(active);
};

const setTheme = (val) => {
	if (val === dark) {
		root.setAttribute(dataTheme, dark);
		localStorage.setItem(theme, dark);
	} else {
		root.setAttribute(dataTheme, light);
		localStorage.setItem(theme, light);
	}
};

if (currentTheme) {
	root.setAttribute(dataTheme, currentTheme);
	switcher.forEach((btn) => {
		btn.classList.remove(active);
	});

	if (currentTheme === dark) {
		switcher[1].classList.add(active);
	} else {
		switcher[0].classList.add(active);
	}
}

toggleTheme.addEventListener("click", function () {
	const tab = this.parentElement.parentElement;
	if (!tab.className.includes(open)) {
		tab.classList.add(open);
	} else {
		tab.classList.remove(open);
	}
});

for (const elm of switcher) {
	elm.addEventListener("click", function () {
		const toggle = this.dataset.toggle;
		// set active state
		setActive(elm, switcherBtn);
		setTheme(toggle);
	});
}

// Portfolio Search
searchBox.addEventListener("keyup", (e) => {
	const searchInput = e.target.value.toLowerCase().trim();
	portfolioItems.forEach((card) => {
		if (card.dataset.item.includes(searchInput)) {
			card.style.display = "block";
		} else {
			card.style.display = "none";
		}
	});
});

// Portfolio card Filter
for (const link of filterLink) {
	link.addEventListener("click", function () {
		setActive(link, ".filter-link");
		const filter = this.dataset.filter;
		portfolioItems.forEach((card) => {
			if (filter === "all") {
				card.style.display = "block";
			} else if (card.dataset.item === filter) {
				card.style.display = "block";
			} else {
				card.style.display = "none";
			}
		});
	});
}

// Modal/Full site modal "open/close buttons"
for (const elm of openModal) {
	elm.addEventListener("click", function () {
		const modalId = this.dataset.open;
		document.getElementById(modalId).classList.add(isVisible);
	});
}

for (const elm of closeModal) {
	elm.addEventListener("click", function () {
		this.parentElement.parentElement.parentElement.classList.remove(isVisible);
	});
}

// Modal
document.addEventListener("click", (e) => {
	if (e.target === document.querySelector(".modal.is-visible")) {
		document.querySelector(".modal.is-visible").classList.remove(isVisible);
	}
});

document.addEventListener("keyup", (e) => {
	if (e.key === "Escape") {
		document.querySelector(".modal.is-visible").classList.remove(isVisible);
	}
});
