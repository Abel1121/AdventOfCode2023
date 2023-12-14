const fs = require("fs");
const input = fs.readFileSync('./test.txt', 'utf8');
const data = input.replaceAll('\r', '').split("\n");
const stringToArray = data.map(item => item.split(''))
const cutedInput = [];
function cutInput() {
    let cut = [];
    for (let i = 0; i < data.length; i++) {
        if( data[i] === '') {
            cutedInput.push(cut);
            cut = [];
        } else {
            cut.push(data[i]);
        }
    }
}
function checkRows(input) {
    console.log('checkRows input', input)
    let rows = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length-1; j++) {
            if(input[i][j] === input[i][j+1]) {
                console.log(input[i][j], input[i][j+1])
                rows[i] = j+1
            }
        }
    }
    console.log('rows', rows)
}

function replaceXwithY(input) {
    console.log('replaceXwithY input', input)
    let newArray = new Array(input.length).fill([])
    console.log('newArray0', newArray);

        for (let rows = 0; rows < arrayToString.length; rows++) {
            for (let columns = 0; columns < arrayToString[rows].length - 1; columns++) {
                console.log('newArray0.1', arrayToString[columns]);

                if(!newArray[i][columns]) {
                    newArray[i].push(new Array(arrayToString[rows].length))
                }
                newArray[i][columns][rows] = arrayToString[rows][columns]
                // console.log('newArray', newArray)
            }

        console.log('newArray1', newArray)
    }
}

function part1() {
    cutInput()
    checkRows(cutedInput)
    replaceXwithY(cutedInput)

}
function part2() {
}
part1();
//console.log(part2()); // 742305960572
