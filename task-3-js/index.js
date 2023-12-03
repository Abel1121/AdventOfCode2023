const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.replaceAll('\r', '').split("\n");

function part1() {
    let finalNumber = 0
    for (let i= 0; i < data.length-1; i++) {
        const findNumbers = [...data[i].matchAll(/\d+/g)].map(match => match);
        // const indexNumber = /\d+/.exec(data[i]);
        const findSpecialCharacter = [...data[i]?.matchAll(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/g)].map(match => match?.index);
        if(i < data.length) {
            findSpecialCharacter.push([...data[i+1]?.matchAll(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/g)].map(match => match?.index));
        }if(i > 0) {
            findSpecialCharacter.unshift([...data[i-1]?.matchAll(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/g)].map(match => match?.index));
        }
        findNumbers?.map((item, index) => {
            const indexNumber = [findNumbers[index]?.index > 0 ? findNumbers[index]?.index -1 : findNumbers[index]?.index, findNumbers[index]?.index + findNumbers[index][0]?.length];
            const find = findSpecialCharacter.flat().find(spc => {
                return +indexNumber[0] <= spc && +indexNumber[1] >= spc
            })
            if(find) {
                finalNumber += +item[0]
            }
        })
    }
    return console.log('part1 finalNumber', finalNumber)
}
function part2() {
    let finalNumber = 0
    for (let i= 0; i < data.length-1; i++) {
        const findGears = [...data[i].matchAll(/\*/g)].map(match => match);
        const findSpecialCharacter = [[...data[i]?.matchAll(/\d+/g)].map(match => match)];
        if(i < data.length) {
            findSpecialCharacter.push([...data[i+1]?.matchAll(/\d+/g)].map(match => match));
        }if(i > 0) {
            findSpecialCharacter.unshift([...data[i-1]?.matchAll(/\d+/g)].map(match => match));
        }
        if(findGears.length) {
            findGears?.map((item) => {
                const numbers = [];
                findSpecialCharacter.map(char => {
                    char.map(it => {
                        const indexNumber = [it?.index > 0 ? it?.index -1 : it?.index, it?.index + it?.[0]?.length];
                        if(+indexNumber[0] <= item.index && +indexNumber[1] >= item.index) {
                            numbers.push(it?.[0])
                        }
                    })
                    if(numbers.length > 1) {
                        finalNumber += numbers[0] * numbers[1]
                        numbers.length = 0
                    }
                })

            })
        }
    }
    return console.log('part2 finalNumber', finalNumber)
}
part1();
part2();
