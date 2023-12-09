const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.replaceAll('\r', '').split("\n");

const seedsArray = data[0].split(' ').slice(1).map(Number);
const seedsObj = {}

seedsArray.forEach((seed, index) => {
    if (index%2 === 0) {
        seedsObj[seed] = seedsArray[index+1]
    }
})
const separate = []
function separat(data)  {
    let array = []
    data.map(item => {
        if(item !== '') {
            array.push(item.split(' ').map(Number))
        } else {
            separate.push(array.slice(1))
            array = [];
        }
    })
}
separat(data.slice(2))

const newMaps = separate.reverse().map(x => x.sort((a,b) => a[0] - b[0]))

const locations = newMaps[0]

const otherMaps = newMaps.splice(1)

const part22 = () => {
    let lowestStart;
    for (let locationSet of locations) {
        let currentNumber = locationSet[1]
        for (let i = locationSet[1]; i < locationSet[1] + locationSet[2]; i++) {
            currentNumber = i;
            otherMaps.forEach((otherMap) => {
                for (let set of otherMap ) {
                    if (currentNumber >= set[0] && currentNumber < set[0]+set[2]) {
                        currentNumber = set[1] + (currentNumber - set[0]);
                        break;
                    }
                }
            })
            for (seed of Object.keys(seedsObj)) {
                if (currentNumber >= +seed && (currentNumber < (+seed + seedsObj[seed]))) {
                    lowestStart = i - locationSet[1]
                    break;
                }
            }
            if (lowestStart >= 0) {
                break;
            }
        }
        if (lowestStart >= 0) {
            break;
        }
    }
    return lowestStart
}
module.exports = {
    part22
}
