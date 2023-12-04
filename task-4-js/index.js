const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.replaceAll('\r', '').split("\n");
const takeCard = (data, i) => {
    const separatoNumbers = data[i].split('|').filter((str) => str !== '');
    const winningNumbers = separatoNumbers[0].split(':').filter((str) => str !== '').slice(1)[0].split(' ').filter((str) => str !== '')
    const card = separatoNumbers[1].split(' ').filter((str) => str !== '');
    const number = card.filter(number => winningNumbers.some(item => +item === +number)).length

    return {winningNumbers, card, number}
}

function part1() {
    let finalNumber = 0;
    for (let i= 0; i < data.length-1; i++) {
        const cards = takeCard(data, i)

        let num = 0
        for (let i= 0; i < cards.number; i++) {
            num = i === 0 ? 1 : num*2
        }
        finalNumber += num
    }
    console.log('finalNumber part1', finalNumber)

}
function part2() {
    let finalNumber = 0;
    const num = []
    for (let i= 0; i < data.length-1; i++) {
        const cards = takeCard(data, i)
        const dup = []
        for (let j= 0; j < cards.number; j++) {
            dup.push(i+j+2)
            num.push(i+j+2)
        }
        const howMany = num.filter(number => number === i+1).length
        if (howMany > 0) {
            for (let k= 0; k < howMany; k++) {
                num.push(...dup)
            }
        }
            finalNumber += 1
    }
    console.log('finalNumber part2', finalNumber + num.length)
}
part1();
part2();
