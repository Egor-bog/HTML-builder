const { rejects } = require('assert');
const fs = require ('fs');
const { resolve } = require('path');
const path = require ('path');

const dirText = path.join(__dirname, 'text.txt')

const readFileAsync = async (path) => {
    return new Promise ((resolve, rejects) => fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
        if (err) {
            return rejects(err.message)
        }
        resolve(data)
    }))
}



readFileAsync(path.join(__dirname, 'text.txt'))
    .then(data => console.log(data))
    .catch(err => console.log(err))