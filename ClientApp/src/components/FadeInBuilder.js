function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }    
    return array;
}


export default class FadeInBuilder {
    numberArray = [];
    index = 0;
    count = 0;
    constructor(min, max, count) {        
        count--;        
        let numbers = [];
        let step = (max - min) / count;
        for (let x = min; x <= max; x += step) {
            numbers.push(x);
        }
        this.count = count;
        this.numberArray = shuffle(numbers);
        return () => {
            let number = this.numberArray[this.index]
            this.index++;
            if (this.index > count) {
                this.index = 0;
            }
            return number + 's';
        };
    }
}