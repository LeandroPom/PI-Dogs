const postCreate = require('../controllers/postCreate')

module.exports = async (req, res) =>{

    const { name, image, life_span, height, weight, temperament } = req.body

    try {

        let newDog = await postCreate( 
            name, 
            image, 
            life_span, 
            height, 
            weight, 
            temperament
        )

        if(newDog.status === 'this dog already exist'){

            return res.status(400).json(newDog.status)

        }else{

            return res.status(201).json(newDog);
        }

    } catch (error) {
        
        res.status(500).json(error.message)
    }
}