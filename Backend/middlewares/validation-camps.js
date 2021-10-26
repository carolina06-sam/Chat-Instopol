const { validationResult }= require('express-validator');

const validationCamps = (req, res, next ) => {

    const error = validationResult( req);

    if ( !error.isEmpty()){
        return res.status(400).json ({
            ok: false,
            error : error.mapped()
        });
    }
    
    next();

}

module.exports ={
    validationCamps
}