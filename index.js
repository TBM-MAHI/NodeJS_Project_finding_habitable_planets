const { parse } = require("csv-parse");
const fs = require('fs');
const result = [];
/* 
fs.createReadStream( ) retuns an instance of the class Class: fs.ReadStream
 */
fs.createReadStream('./keplar_data.csv').
    on('data', (datas) => result.push(datas)).
    on('error',(err)=>console.log(err)).
    on('end', () => {
        console.log(result);
        console.log('end');
    })