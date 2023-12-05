const getTemps = require('../controllers/getTemps')

module.exports = async (req, res) => {
    try {
        
        let temps = await getTemps();

        res.status(200).json(temps)

    } catch (error) {

        res.status(500).json(error.message)
    }
}