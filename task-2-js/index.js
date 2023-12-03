const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.replaceAll('\r', '').split("\n");
function part1() {
    let finalNumber = 0
    for (let i= 0; i < data.length-1; i++) {
     const separate = data[i]?.replaceAll('red','12').replaceAll('green','13').replaceAll('blue','15').split(' ').slice(2);
     let j = 0;
     let goodGame = 0
     while(j < separate.length) {
         const sep = separate[j+1].replaceAll(',', '').replaceAll(';', '')
         if(+separate[j] > +sep) {
             goodGame = 0
             break;
         } else {
             goodGame = i+1
         }

         j+=2
     }
     finalNumber += goodGame
 }
return console.log('part2 finalNumber', finalNumber)
}
function part2() {
    let finalNumber = 0
    for (let i= 0; i < data.length-1; i++) {
        let greenNumber = 0;
        let redNumber = 0;
        let blueNumber = 0;
        const separate = data[i]?.split(' ').slice(2);
        let j = 0;
        let goodGame = 0
        while(j < separate.length) {
            const sep = separate[j+1].replaceAll(',', '').replaceAll(';', '')
            // console.log(separate, sep)

            if(sep === 'blue' && separate[j] > blueNumber) {
                blueNumber = Number(separate[j])
            } else if (sep === 'red' && separate[j] > redNumber) {
                redNumber = Number(separate[j])
            } else if(sep === 'green' && separate[j] > greenNumber) {
                greenNumber = Number(separate[j])
            }
            j+=2
        }
        finalNumber += greenNumber *redNumber*blueNumber
    }
    return console.log('part2 finalNumber', finalNumber)
}
part1()
part2()
