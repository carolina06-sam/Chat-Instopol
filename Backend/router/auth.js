/*
    path: api/login
*/

const { Router } = require("express");
const { check } = require("express-validator");

//Controladores
const {
  createUser,
  loginUser,
  renewToken,
  login,
} = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validationCamps } = require("../middlewares/validation-camps");

const router = Router();

// Crear nuevos usuarios

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("position", "El cargo es obligatorio").not().isEmpty(),
    // check('group', 'El grupo es obligatorio').not().isEmpty(),
    validationCamps,
  ],
  createUser
);

//Login
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    // check('group', 'El grupo es obligatorio').not().isEmpty(),
    validationCamps,
  ],
  login
);


//Revalidar token
router.get("/renew", validateJWT, renewToken);

module.exports = router;
