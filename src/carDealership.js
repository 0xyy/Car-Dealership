class CarDealership {
    constructor() {
        this.cars = this.loadFromLocalStorage() ?? [];
    }

    clear() {
        this.cars.length = 0;
        this.saveToLocalStorage();
    }

    add(newCar) {
        this.cars.push(newCar);
        this.saveToLocalStorage();
    }

    remove(no) {
        this.cars.splice(no - 1, 1);
        this.saveToLocalStorage();
    }

    showCars() {
        return this.cars
            .map(({mark, model, price}, i) => {
                return {
                    id: i + 1,
                    text: `${i + 1}. ${mark} ${model} - ${price}zł.`,
                }
            });
    }

    getTotalValue() {
        return this.cars.reduce((prev, car) => prev + car.price, 0);
    }

    saveToLocalStorage() {
        localStorage.setItem('cars-basket', JSON.stringify(this.cars));
    }

    loadFromLocalStorage() {
        return JSON.parse(localStorage.getItem('cars-basket'));
    }
}

class Car {
    constructor(mark, model, price) {
        this.mark = mark;
        this.model = model;
        this.price = price;
    }
}



