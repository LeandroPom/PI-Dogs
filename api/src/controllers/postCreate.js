require('dotenv').config()
const { API } = process.env
const { Dog, Temperaments } = require('../db')
const axios = require('axios').default


module.exports = async ( name, image, life_span, height, weight, temperament) => {
    
    const response = await axios(API);

    // valida si existe en la api 
    const found = response.data.some((e) => name === e.name)

    //si es igual a found el perro ya existe en la api por tanto no lo crea
   if(found){
       
        return { status: 'this dog already exist' }

    }else{
        // Busca los temperamentos en la base de datos
        const existingTemp = await Temperaments.findOne({
            where: { name: temperament }
        });

        if (!existingTemp) {
            // Si no encuentra el temperamento, lanza un error
            throw new Error(`${temperament} is not a valid temperament`);
        }

        // Crear un nuevo Perro en la base de datos
        const [newDog] = await Dog.findOrCreate({
            where: { name: name },
            defaults: { 
                name, 
                image, 
                life_span, 
                height, 
                weight, 
                temperament,
            }
        });

        // Asociar el temperamento al nuevo Perro
        await newDog.addTemperaments(existingTemp);

        // Formatear los datos antes de retornarlos
        const formattedDog = {
            name: name,
            image: image,
            life_span: life_span,
            height: height,
            weight: weight,
            temperament: temperament
        };

        return formattedDog;
    }
}
