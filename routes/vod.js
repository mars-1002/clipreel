import { Router } from 'express'
import * as vodsCtrl from '../controllers/vod.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET Localhost:3000/vods
router.get('/', vodsCtrl.index)

// GET Localhost:3000/vods/login
router.get('/login', vodsCtrl.login)

// GET Localhost:3000/vods/new
router.get('/new', isLoggedIn, vodsCtrl.new)

// GET Localhost:3000/vods/:vodId
router.get('/:vodId', vodsCtrl.show)

// POST Localhost:3000/vods
router.post('/', isLoggedIn, vodsCtrl.create)

// GET Localhost:3000/vods/:vodId/edit
router.get('/:vodId/edit', isLoggedIn, vodsCtrl.edit)

// PUT Localhost:3000/vods/:vodId
router.put('/:vodId', isLoggedIn, vodsCtrl.update)

// DEL Localhost:3000/vods/:vodId
router.delete('/:vodId', isLoggedIn, vodsCtrl.delete)

// POST Localhost:3000/:vodId
router.post('/:vodId/comments', isLoggedIn, vodsCtrl.newComment)

// DELETE Localhost:3000/:vodId/:commentId
router.delete('/:vodId/comments/:commentId', isLoggedIn, vodsCtrl.deleteComment)




export { router }