

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const creatFile = path.join(__dirname, 'text.txt');
let newStream = fs.createWriteStream(creatFile);

rl.write('Введите текст:\n');

rl.addListener('line', (input) => {
  if (input === 'exit') {
    rl.write('Ввод окончен!');
    process.exit(0);
  }
  newStream.write(input + '\n');
});

rl.addListener('close', () => {
  rl.write('Ввод окончен!');
  process.exit(0);
});


