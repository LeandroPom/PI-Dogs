const { Dog, Temperaments } = require('../db')
const axios = require('axios').default


module.exports = async (name) => {
    // Busca el perro en la base de datos local
    const dbDogs = await Dog.findOne({

        where: {
            name: name
        },
        include: [{ 
            model: Temperaments, 
            attributes: ['name'], 
            through: {
                attributes: []
            }
        }]
    })

    if(dbDogs){
        // Si encuentra el perro en la base de datos local, lo devuelve
        return dbDogs

    }else{
        //Busca el perro en la API 
        const response = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)

        if (response.data.length > 0) {
            const e = response.data[0]; // Obtiene el primer resultado de la búsqueda

            return {
                // Devuelve un objeto con las propiedades seleccionadas
                id: e.id,
                name: e.name,
                image: e.reference_image_id,
                life_span: e.life_span,
                height: e.height.metric,
                weight: e.weight.metric,
                temperament: e.temperament
            }

        }else{
            // Si la API no tiene resultados, lanza un error indicando que el nombre es inválido
            throw new Error('invalid name')
        }
    }
} 