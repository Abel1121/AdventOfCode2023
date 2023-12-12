const fs = require("fs");
const input = fs.readFileSync('./test.txt', 'utf8');
const data = input.replaceAll('\r', '').split("\n").filter(item => item !== '');
const stringToArray = data.map(item => item.split(''))

const pipes = [
    {
        symbol: '|',
        move: ['north', 'south']
    },
    {
        symbol: '-',
        move: ['east', 'west']
    },
    {
        symbol: 'L',
        move: ['north', 'east']
    },
    {
        symbol: 'J',
        move: ['north', 'west']
    },
    {
        symbol: '7',
        move: ['south', 'west']
    },
    {
        symbol: 'F',
        move: ['south', 'east']
    }
]
const findS = (input) => {
    let startPosition;
    for (let x = 0; x < input.length; x++) {
        if(input[x].includes('S')) {
            input[x].map((item, y) => {
                if (item === "S") {
                    startPosition = [x, y]
                }}
            )
        }
    }
    console.log('startPosition S', startPosition)
    return startPosition
}
function translateMap(input) {
    let translateMap = input;

    for (let x = 0; x < input.length; x++) {
        translateMap[x].map((item, index) => {
            const find = pipes.find(char => char.symbol === item)
            return translateMap[x][index] = find ? find?.move : item;
        })
    }
    return translateMap
}
function checkAround(position, map) {
    const [x, y] = position;
    const connection = []
        console.log(map[x][y])
        console.log(map[x-1][y]?.includes('south'))
        console.log(map[x+1][y]?.includes('north'))
        console.log(map[x][y-1]?.includes('east'))
        console.log(map[x][y+1]?.includes('west'))
}
function part1() {
    const startPosition = findS(stringToArray)
    const translateMapp = translateMap(stringToArray)
    checkAround(startPosition, translateMapp);

    // console.log(stringToArray)
}
function part2() {
}
part1();
