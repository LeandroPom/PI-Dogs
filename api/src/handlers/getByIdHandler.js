const getById = require('../controllers/getById')


module.exports = async (req, res) => {

    const { id } = req.params

    console.log(id)

    try {

        const idDog = await getById(id)

        res.status(200).json(idDog)

    } catch (error) {
        
        res.status(404).json(error.message)
    }
}