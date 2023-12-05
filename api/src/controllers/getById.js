require('dotenv').config();
const { API } = process.env;
const { Dog, Temperaments } = require('../db');
const axios = require("axios").default

module.exports = async (id) => {

    const dbID = /[a-zA-Z]/.test(id)    
    
    if(!dbID){

        const response = await axios.get(API)

        // busca el perro en la respuesta de la API
        const found = response.data.find((e) => id === e.id);
        
        //si encuentra el perro devuelve el objeto
        return{
            id: found.id,
            name: found.name,
            image: found.reference_image_id,
            life_span: found.life_span,
            height: found.height.metric,
            weight: found.weight.metric,
            temperament: found.temperament
        }

    }else{

        // Busca el perro en la base de datos local por su ID
        const dbDogs = await Dog.findOne({

            where: { //where: especifica los criterios de búsqueda
                id: id
            },
            include: [{ //include se utiliza para especificar qué relaciones deben ser incluidas en la consulta
                model: Temperaments, //model: Temperaments indica que deseas incluir información de la tabla "Temperaments"
                attributes: ['id'], //attributes: ['id'] especifica que solo deseas recuperar el campo "id" de la tabla "Temperaments"
                through: {
                    attributes: []
                //through: { attributes: [] } se usa para indicar que no deseas incluir ningún atributo adicional de la relación entre "Dog" y "Temperaments". En otras palabras, no se incluirán otros datos además de los IDs de los Temperaments.
                }
            }]
        });

        if(dbDogs){
            //si encuentra el perro devuelve el objeto
            return{
                id: dbDogs.id,
                name: dbDogs.name,
                image: dbDogs.image,
                life_span: dbDogs.life_span,
                height: dbDogs.height,
                weight: dbDogs.weight,
                temperament: dbDogs.temperament
            }

        }else{

            throw new Error('Dog not found')
        } 
    }
}