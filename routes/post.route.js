const express = require('express')
const router = express.Router()
const passport = require('passport')
const bodyParser = require('body-parser').json();

const postController = require('../controllers/post.controller')

router.get('/', postController.posts)
router.put('/update/:id',passport.authenticate('jwt', {session: false}),bodyParser, postController.update)
router.post('/create',passport.authenticate('jwt', {session: false}),bodyParser, postController.create)
router.get('/:id', postController.getPost)
router.delete('/delete/:id',passport.authenticate('jwt', {session: false}), postController.deletePost)

module.exports = router


