const buyBtns = [...document.querySelectorAll('[data-model]')];
const basketUl = document.querySelector('.basket-list');
const buyAllBtn = document.querySelector('.btn-buy-all');

const cracowCarDealership = new CarDealership();

const removeCar = event => {
    const id = Number(event.target.dataset.id);
    cracowCarDealership.remove(id);
    createBasketUi();
};

const createBasketUi = () => {
    basketUl.innerText = '';

    for (const {
            text,
            id
        } of cracowCarDealership.showCars()) {

        const newLi = document.createElement('li');
        newLi.innerText = text;
        newLi.dataset.id = id;
        newLi.addEventListener('click', removeCar);
        basketUl.appendChild(newLi)

    }

    const basketTotalValue = cracowCarDealership.getTotalValue();
    buyAllBtn.innerText = `Place an order for value ${basketTotalValue.toFixed(2)} zł.`;

    buyAllBtn.disabled = basketTotalValue === 0;
};

const addProductToBasket = event => {
    const mark = event.target.dataset.mark;
    const model = event.target.dataset.model
    const price = Number(event.target.dataset.price);

    const newCar = new Car(mark, model, price);

    cracowCarDealership.add(newCar);

    createBasketUi();
};

const buyAllCars = () => {
    const basketTotalValue = cracowCarDealership.getTotalValue();
    alert(`You placed an order of value ${basketTotalValue} zł.`);
    cracowCarDealership.clear();
    createBasketUi();
};

for (const btn of buyBtns) {
    btn.addEventListener('click', addProductToBasket);
}

buyAllBtn.addEventListener('click', buyAllCars);

createBasketUi();