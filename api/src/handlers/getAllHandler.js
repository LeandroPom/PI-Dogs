const getAll = require('../controllers/getAll')

module.exports = async (req, res) =>{

    try {
        
        const dogs = await getAll()

        res.status(200).json(dogs)
        
    } catch (error) {
        
        res.status(400).json(error.message)
    }
}