require('dotenv').config();
const { API } = process.env;
const { Temperaments } = require('../db');
const axios = require('axios').default;

module.exports = async () => {
    // Busca el temperaento en la base de datos local
    const dbTemps = await Temperaments.findAll();

    if(dbTemps.lenght){
        // Si encuentra el temperamento en la base de datos local, lo devuelve
        let dbData = dbTemps.map((temp) => ({
            id: temp.id,
            name: temp.name,
        }));

        return dbData

    } else {
        //Realiza una peticion la API 
        const response = await axios(API);

        const temps = response.data;

        //Se extrae la propiedad .temperament de response.data
        const tempArray = temps.map((dog) => dog.temperament).join(',');

        //Separa las palabras en .temperament por comas y hace una lista sin repetir
        const uniqueTemps = [...new Set(tempArray.split(','))]; 
        //Set() solo permite valores únicos

        // Guarda en la db cada item en la lista
        uniqueTemps.forEach(async t => {
            await Temperaments.findOrCreate({
                where: {
                    name: t.trim()
                }
            });
        });

        //envia al front solo lo nesesario
        return uniqueTemps.map( (t) => ({
            name: t.trim()
        }))
    }
}