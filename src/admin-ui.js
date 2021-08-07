const addCarsForm = document.querySelector('.form-add-car');
const markInput = document.querySelector('[name="car-mark"]');
const modelInput = document.querySelector('[name="car-model"]');
const priceInput = document.querySelector('[name="car-price"]');
const carsUl = document.querySelector('.car-list');

const saveCarsToLocalStorage = (mark, model, price) => {
    const carsList = JSON.parse(localStorage.getItem('car-list')) ?? [];
    carsList.push({mark, model, price});
    localStorage.setItem('car-list', JSON.stringify(carsList));
}

const loadCarsFromLocalStorage = () => {
    const carsList = JSON.parse(localStorage.getItem('car-list')) ?? [];

    for (const {mark, model, price} of carsList) {
        addCarToShop(mark, model, price);
    }
}

const addCarToShop = (mark, model, price) => {
    const newLi = document.createElement('li');

    const newStrong = document.createElement('strong');
    newStrong.innerText = `${mark} ${model}`;

    const newPriceText = document.createTextNode(` - ${price.toFixed(2)}zł. `);

    const newBtn = document.createElement('button');
    newBtn.innerText = 'Kup!';
    newBtn.classList.add('btn-buy-product');
    newBtn.dataset.mark = mark;
    newBtn.dataset.model = model;
    newBtn.dataset.price = String(price);
    newBtn.addEventListener('click', addProductToBasket);

    newLi.appendChild(newStrong);
    newLi.appendChild(newPriceText);
    newLi.appendChild(newBtn);

    carsUl.appendChild(newLi);

    markInput.value = '';
    modelInput.value = '';
    priceInput.value = '';
}

const handleAddCarFormSubmit = event => {
    event.preventDefault();

    const mark = markInput.value;
    const model = modelInput.value;
    const price = Number(priceInput.value);

    addCarToShop(mark, model, price);
    saveCarsToLocalStorage(mark, model, price)
};

addCarsForm.addEventListener('submit', handleAddCarFormSubmit);

loadCarsFromLocalStorage();