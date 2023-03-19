const { parse } = require("csv-parse");
const fs = require('fs');
const habitablePlanets = [];
/* 
fs.createReadStream( ) retuns an instance of the class Class: fs.ReadStream
fs.ReadStream has events that are being handeled/
 */
fs.createReadStream('./keplar_data.csv', { encoding: 'utf-8' }).
    pipe(parse({
        comment: '#',
        columns: true
    }
    )).
    on('data', (planetData) => {
        if (isHabitable(planetData)) 
            habitablePlanets.push(planetData);
    }).
    on('error', (err) => console.log(err)).
    on('end', () => {
        console.log(habitablePlanets.length,"habitable planets found! \n They are :");
        let habitablePlanetsNames = habitablePlanets.map((p) => p.kepler_name);
        for (let names of habitablePlanetsNames)
            console.log(`\t ${names}`);
        console.log('end');
})

function isHabitable(planet) {
    //returns true or false
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
