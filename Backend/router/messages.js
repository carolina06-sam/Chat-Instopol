/*
    Path: api/messages
*/

const {Router} = require('express');
const { getChat } = require('../controllers/messages');
const {validateJwt, validateJWT} = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:from', validateJWT, getChat);

module.exports= router;
