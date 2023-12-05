const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.replaceAll('\r', '').split("\n");

const seeds = data[0].split(' ').slice(1)
const separate = [];
let localization = [];
function separat(data)  {
    let array = []
    data.map(item => {
        if(item !== '') {
            array.push(item)
        } else {
            separate.push(array.slice(1))
            array = [];
        }
    })
}
const names= ['seed', 'soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location']
const transfer = (data, index) => {
    const datas = data.map(item => item.split(' '))
    localization.forEach((local) => {
        datas.map(item => {
            if((+item[1] + +item[2]) > +local[`${names[index]}`] && +local[`${names[index]}`] >= +item[1]) {
                return local[`${names[index+1]}`] = (+local[`${names[index]}`] + (Number(item[0]) - Number(item[1])) )
            }
            if(!+local[`${names[index+1]}`]) {
                return local[`${names[index+1]}`] = +local[`${names[index]}`]
            }
        })
    })
}

function part1() {
    separat(data.slice(2))
    localization = seeds.map(item => { return {'seed': +item}})

    for (let i= 0; i < separate.length; i++) {
        transfer(separate[i], i)
    }
    const min = Math.min(...localization.map(item => item['location']))
    console.log('finalNumber part1', min)

}
// function part2() {
//     console.log('start0')
//
//     separat(data.slice(2))
//     console.log('start1')
//     const loc2 = []
//     for (let i= 0; i <= seeds.length; i+=2) {
//         let loc = []
//         for (let j = 0; j < seeds[i+1]; j++) {
//             loc.push({'seed': +seeds[i]+j})
//
//         }
//         loc2.push(...loc)
//         loc=[];
//     }
//     console.log('first for end')
//     // console.log('localization', localization, localization.length)
//     for (let i= 0; i < separate.length; i++) {
//         transfer(separate[i], i, loc2)
//     }
//     console.log('2nd for end')
//
//     const min = Math.min(...localization.map(item => item['location']))
//     // console.log('localization', localization, localization.length)
//     console.log('finalNumber part2', min)
//
// }
part1();
//part2();
