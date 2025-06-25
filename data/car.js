class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen;

  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed}km/h,
       Trunk is ${this.isTrunkOpen ? 'open' : 'closed'}`);
  }

  go() {
    if (!this.isTrunkOpen) {
      this.speed += 5;
      if (this.speed > 200) {
        this.speed = 200;
      }
    }
  }

  brake() {
    this.speed -= 5;
    if (this.speed < 0) {
      this.speed = 0;
    }
  }

  openTrunk() {
    if(!(this.isTrunkOpen || this.speed)) {
      this.isTrunkOpen = !this.isTrunkOpen;
    }
  }

  closeTrunk() {
    if(this.isTrunkOpen) {
      this.isTrunkOpen = !this.isTrunkOpen;
    }
  }
}

class Racecar extends Car {
  acceleration;

  constructor(brand, model, acceleration) {
    super(brand, model);
    this.acceleration = acceleration;
  }

  go() {
    this.speed += this.acceleration;
    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    return;
  }

  closeTrunk() {
    return;
  }

  displayInfo() {
    console.log(`${this.brand} ${this.model}, Speed: ${this.speed}km/h`);
  }
}

console.log('hello');

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3');

console.log(car1);
console.log(car2);

for (let i = 0; i < 10; i++) {
  car1.go();
}

car1.openTrunk();

for (let i = 0; i < 5; i++) {
  car1.brake();
}

car2.openTrunk();

car1.displayInfo();
car2.displayInfo();

car1.closeTrunk();
car2.closeTrunk();

car1.displayInfo();
car2.displayInfo();

const racecar1 = new Racecar('McLaren', 'F1', 20);

console.log(racecar1);

for (let i = 0; i < 10; i++) {
  racecar1.go();
}

racecar1.openTrunk();

for (let i = 0; i < 5; i++) {
  racecar1.brake();
}

racecar1.displayInfo();

racecar1.closeTrunk();

racecar1.displayInfo();
