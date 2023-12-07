const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.replaceAll('\r', '').split("\n");
const separat = data.filter(item => item !== '').map(item => item.split(' '))
const power = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const jokerCard = 'J'
function comparePowerCard(a, b, joker) {
    let powerArray = [...power];
    if (joker) {
        powerArray.push(jokerCard)
        powerArray.splice(powerArray.indexOf(jokerCard), 1);
    }
    let value = 0
    for (let i = 0; i < a.length; i++) {
        const aPower = powerArray.indexOf(a[i]);
        const bPower =  powerArray.indexOf(b[i])
        if(aPower < bPower) {
            value = 1
            break;
        } else if(aPower > bPower) {
            value = -1;
            break;
        }
    }
    return value
}
function sortCard(separato, duplicates, joker) {
    const addPower = separato.map((item, index) => [item[0], Number(item[1]), duplicates[index]])
    return addPower.sort((a, b) => {
        if(a[2] < b[2]) {
            return -1
        } else if (a[2] > b[2]) {
            return 1
        } if (a[2] === b[2]) {
            return comparePowerCard(a[0], b[0], joker)
        }
    })
}
function part1() {
  const duplicates = separat.map(string => {
      const unique = [];
      string[0].split('').forEach((element) => {
          const count = string[0].split('').filter(x => x === element).length
          if(count > 1) {
              unique.push(count)
          }
      })
      return unique.reduce((a,b) => a+b,0)
  })

    const sort = sortCard(separat ,duplicates, false)

    let finalNumber = sort.reduce((acc, a, index) => acc + (Number(a[1]) * (index+1)),0)
    console.log('finalNumber part1', finalNumber); //157340011
}
function getAllJokerIndexes(arr) {
    const indexes = [];
    for(let i = 0; i < arr.length; i++)
        if (arr[i] === jokerCard)
            indexes.push(i);
    return indexes;
}
function part2() {
    const duplicates = separat.map(string => {
        let unique = [];

        string[0].split('').forEach((element) => {
            const count = string[0].split('').filter((x) => x === element && x !== jokerCard).length
            if(count > 1) {
                unique.push(count)
            }
        })
        let jokers = [];
        if(string[0].includes(jokerCard)) {
            jokers = getAllJokerIndexes(string[0].split('')).length
            if(unique.length === 2 || unique.length === 3) {
                unique = unique.map(item => item + jokers)
                for (let i = 0; i < jokers; i++) {
                    unique.push(unique[0])
                }
            } else if (unique.length === 4) {
                if (unique[0] === 4) {
                    unique = unique.map(item => item + jokers)
                    for (let i = 0; i < jokers; i++) {
                        unique.push(unique[0])
                    }
                } else {
                    for (let i = 0; i <= jokers; i++) {
                        unique[i] += jokers
                    }
                    for (let i = 0; i < jokers; i++) {
                        unique.push(unique[0])
                    }
                }
            } else if (unique.length === 0) {
                if(jokers === 5) {
                    for (let i = 0; i < jokers; i++) {
                        unique.push(jokers)
                    }
                } else {
                    for (let i = 0; i <= jokers; i++) {
                        unique.push(jokers+1)
                    }
                }
            } else {
                unique.push(2,2)
            }


        }
        return unique.reduce((a,b) => a+b,0)
    })
    const sort = sortCard(separat ,duplicates, true)

    let finalNumber = sort.reduce((acc, a, index) =>  acc + (Number(a[1]) * (index+1)),0)
    console.log('finalNumber part2', finalNumber); //246436046
}
part1();
part2();
