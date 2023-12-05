require('dotenv').config();
const { API } = process.env;
const { Dog, Temperaments } = require('../db');
const axios = require('axios').default;

module.exports = async () =>{

    // Realiza una consulta a la base de datos local y obtiene los perros
    const dbDogs = await Dog.findAll({
        
        include: [{
            model: Temperaments,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }]
    })

    // Realiza una consulta a la API y obtiene los perros
    let response = await axios(API)

    const apiDogs = response.data.map( e => {
        return {
            id: e.id,
            name: e.name,
            image: e.reference_image_id,
            life_span: e.life_span,
            height: e.height.metric,
            weight: e.weight.metric,
            temperament: e.temperament
        }
    })

    // Combina los resultados en un unico array 
    const allDogs = [...dbDogs, ...apiDogs]
    return allDogs
}