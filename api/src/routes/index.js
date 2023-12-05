const { Router } = require('express');
const dogsRouter = require('./dogs.routes');
const tempRouter = require('./temp.routes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use((req, res, next) => {
    console.log(`Request to route: ${req.url}`);
    next();
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRouter);
router.use('/temperaments', tempRouter);


module.exports = router;
