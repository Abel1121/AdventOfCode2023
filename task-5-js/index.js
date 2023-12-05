const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.replaceAll('\r', '').split("\n");

const seeds = data[0].split(' ').slice(1)
const separate = [];
let localization = [];
let minLocalization= null;
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
            if (!minLocalization || local['location'] < minLocalization['location']) {
                minLocalization = local;
            }
        })
    })
}
const transfer2 = (data, index, howManyLoop, position) => {
    const datas = data.map(item => item.split(' '))
    for (let i= 0; i < howManyLoop; i++) {
        const local = localization[position-1]['seed'] + i*1000
        console.log('local1', local)
        datas.map(item => {
            if ((+item[1] + +item[2]) > +local[`${names[index]}`] && +local[`${names[index]}`] >= +item[1]) {
                return local[`${names[index + 1]}`] = (+local[`${names[index]}`] + (Number(item[0]) - Number(item[1])))
            }
            if (!+local[`${names[index + 1]}`]) {
                return local[`${names[index + 1]}`] = +local[`${names[index]}`]
            }
            if (!minLocalization || local['location'] < minLocalization['location']) {
                minLocalization = local
            }

            //console.log('local', local, minLocalization, local['location'], minLocalization['location'], local['location'] < minLocalization['location'])
        })
    }
}
function part1() {
    separat(data.slice(2))
    localization = seeds.map(item => { return {'seed': +item}})

    for (let i= 0; i < separate.length; i++) {
        transfer(separate[i], i)
    }

    console.log('finalNumber part1', minLocalization['location'] )
}
function part2() {
    localization = []
    separat(data.slice(2))

    for (let i= 0; i < seeds.length; i+=2) {
            localization.push({'seed': +seeds[i]},{'seed': Number(seeds[i])+Number(seeds[i+1])})
    }

    console.log('localization0', localization)
    for (let i= 0; i < separate.length; i++) {
        transfer(separate[i], i)
    }
    const index = localization.findIndex(item => item['seed'] === minLocalization['seed'])
    const howManyLoop = localization[index]['seed'] - localization[index-1]['seed']
    for (let i= 0; i < separate.length; i++) {
        transfer2(separate[i], i, howManyLoop, index)
    }
    console.log('localization', localization[index], howManyLoop);
    console.log('minLocalization', minLocalization);
}
//part1();
part2();
