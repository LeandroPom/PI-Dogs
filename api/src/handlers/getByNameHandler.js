const getByName = require('../controllers/getByName')


module.exports = async (req, res) => {

    const { name } = req.query;

    try {
        
        if(name){

            const nameLower = name.toLowerCase();
            console.log(nameLower)

            let dogsName = await getByName(nameLower)
            
            res.status(200).json(dogsName)

        }else{

            throw new Error('invalid field')
        }
    } catch (error) {
     
        console.error(error);

        res.status(500).json({ error: 'Internal Server Error' });
    }
}