import { useTrail } from "react-spring";

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



export default function FadeInBuilder() {
    const [trail, set] = useTrail(3, () => ({ opacity: 0, config: { mass: 1, tension: 210, friction: 25 } }))
    const shuffledTrail = shuffle(trail);

    let i = 0;
    const getFade = () => {
        i++;
        if (i >= 3) i = 0;
        return shuffledTrail[i]
    };
    return [set, getFade]
}

export function FadeInBuilderStart() {
    const [trail, set] = useTrail(3, () => ({ from: { opacity: 0 }, to: { opacity: 1 }, config: { mass: 1, tension: 210, friction: 25 } }))
    const shuffledTrail = shuffle(trail);

    let i = 0;
    const getFade = () => {
        i++;
        if (i >= 3) i = 0;
        if (trail !== undefined) {
            return shuffledTrail[i]
        }
        return {}
    };
    return [set, getFade]
}

// export default class FadeInBuilder {
//     numberArray = [];
//     index = 0;
//     count = 0;
//     constructor(min, max, count) {        
//         count--;        
//         let numbers = [];
//         let step = (max - min) / count;
//         for (let x = min; x <= max; x += step) {
//             numbers.push(x);
//         }
//         this.count = count;
//         this.numberArray = shuffle(numbers);
//         return () => {
//             let number = this.numberArray[this.index]
//             this.index++;
//             if (this.index > count) {
//                 this.index = 0;
//             }
//             return number + 's';
//         };
//     }
// }