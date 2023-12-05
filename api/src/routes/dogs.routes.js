const { Router } = require('express')
const dogsRouter = Router()
const getAll = require('../handlers/getAllHandler')
const getById = require('../handlers/getByIdHandler')
const getByName = require('../handlers/getByNameHandler')
const postCreate = require('../handlers/postCreateHandler')

dogsRouter.get('/', getAll)
dogsRouter.get('/name', getByName)
dogsRouter.get('/:idRaza', getById)
dogsRouter.post('/', postCreate)

module.exports = dogsRouter