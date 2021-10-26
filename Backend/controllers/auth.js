const { response } = require("express");
const bcrypt = require ('bcryptjs');

const User = require ('../models/user');
const { generateJWT } = require("../helpers/jwt");


const createUser = async (req, res = response) => {
    
    try{

        const { email, password } = req.body;

        // Verificar que el email no existe
        const existsEmail = await User.findOne({ email });
        if (existsEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            });
        }

        const user = new User( req.body);

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);


        // Guardar user en DB
        await user.save();

        // Generar el JWT
        const token = await generateJWT(user.id);


        res.json({
            ok: true,
            user,
            token
        })

    } catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con administrador'
        });
    }
}

// login 
const login = async(req, res) => {

    const { email, password} = req.body;

    try {
        // Verificar si existe el email
        const userDB = await User.findOne({email});
        if (!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // Validar el password
        const validPassword = bcrypt.compareSync( password, userDB.password);
        if (!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password no es correcto'
            })
        }

        //Generar el JWT
        const token = await generateJWT(userDB.id);


        res.json({
            ok: true,
            user: userDB,
            token

        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con administrador'
        });
        
    }

    
   
}


// renew token
const renewToken = async(req, res) =>{

    const uid =req.uid;

    // Generar un nuevo JWT
    const token = await generateJWT(uid);

    // Obtener el usuario por UID
    const user = await User.findById(uid);

    res.json ({
        ok: true,
        user,
        token
        
    })
}


module.exports = {
    createUser,
    login,
    renewToken
}
