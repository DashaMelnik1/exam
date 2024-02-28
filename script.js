const items = [{
        title: "Портрет",
        description: "Портрет по вашему фото",
        price: 250,
        img: "./img/1.jpg",
        rating: 4.6,
    },
    {
        title: "Натюрморт",
        description: "Реалистичный натюрморт",
        price: 400,
        img: "./img/2.jpg",
        rating: 4.9,
    },
    {
        title: "Копия 'Кофейница'",
        description: "Копия картины",
        price: 200,
        img: "./img/3.jpg",
        rating: 4.4,
    },
    {
        title: "Портрет",
        description: "Портрет по вашему фото",
        price: 250,
        img: "./img/4.jpg",
        rating: 4.7,
    },
    {
        title: "Пейзаж",
        description: "Домик в деревне",
        price: 200,
        img: "./img/4.jpg",
        rating: 3.8,
    },
    {
        title: "Пейзаж",
        description: "Лес и озеро",
        price: 200,
        img: "./img/6.jpg",
        rating: 4.7,
    },
    {
        title: "Портрет",
        description: "Портрет по вашему фото",
        price: 200,
        img: "./img/7.jpg",
        rating: 4.3,
    },
    {
        title: "Пейзаж",
        description: "Лошадь у моря",
        price: 300,
        img: "./img/8.jpg",
        rating: 4.4,
    },
    {
        title: "Пейзаж",
        description: "Река в горах",
        price: 200,
        img: "./img/9.jpg",
        rating: 4.2,
    },
    {
        title: "Натюрморт",
        description: "Цветы",
        price: 250,
        img: "./img/10.jpg",
        rating: 3.9,
    },
    {
        title: "Портрет",
        description: "Портрет по вашему фото",
        price: 300,
        img: "./img/11.jpg",
        rating: 4.5,
    },
    {
        title: "Пейзаж",
        description: "Поле у леса",
        price: 350,
        img: "./img/12.jpg",
        rating: 4.3,
    },
    {
        title: "Портрет",
        description: "Портрет по вашему фото",
        price: 300,
        img: "./img/13.jpg",
        rating: 4.8,
    },
    {
        title: "Портрет",
        description: "Портрет по вашему фото",
        price: 230,
        img: "./img/14.jpg",
        rating: 3.7,
    },
    {
        title: "Натюрморт",
        description: "Маки по фото",
        price: 400,
        img: "./img/15.jpg",
        rating: 4.9,
    },
    {
        title: "Пейзаж",
        description: "Сосны ",
        price: 200,
        img: "./img/16.jpg",
        rating: 4.8,
    },
    {
        title: "Портрет",
        description: "Портрет по вашему фото",
        price: 300,
        img: "./img/17.jpg",
        rating: 4.2,
    },
    {
        title: "Пейзаж",
        description: "Домик в деревне",
        price: 250,
        img: "./img/18.jpg",
        rating: 4.1,
    },
];
let currentState = [...items];

const itemsContainer = document.querySelector(".portfolio__items");
const itemTemplate = document.querySelector(".item-template");
const nothingFound = document.querySelector("#nothing-found");

function prepareShopItem(shopItem) {
    const { title, description, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".shop-item__price").textContent = `${price}$`;


    const ratingContainer = item.querySelector(".shop-item__rating");

    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }
    return item;
}

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector(".site-search__button");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    searchInput.value = '';
    renderItems(currentState);
    sortControl.selectedIndex = 0;
}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }

    renderItems(currentState);
});

const btnUp = document.querySelector(".up");
let lastScrollTop = document.documentElement.scrollTop;

window.addEventListener('scroll', function() {
    const scrollTopPosition = document.documentElement.scrollTop;

    if (scrollTopPosition > lastScrollTop || scrollTopPosition === 0) {
        btnUp.classList.remove('show');
    } else {
        btnUp.classList.add('show');
    }
    lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
})