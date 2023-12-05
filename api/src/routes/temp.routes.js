const { Router } = require('express')
const tempRouter = Router()
const getTemps = require('../handlers/getTempsHandler')

tempRouter.get('/', getTemps)

module.exports = tempRouter