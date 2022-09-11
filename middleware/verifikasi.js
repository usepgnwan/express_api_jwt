const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifikasi = () => {
    return (req, res, next) => {
        const tokenWithBarier = req.headers.authorization;
        console.log(tokenWithBarier);
        if (tokenWithBarier) {
            var token = tokenWithBarier;
            token = token.split(' ');
            token = token[1];
            // console.log(token);
            jwt.verify(token, config.secret, (err, decode) => {
                // res.send(token);
                if (err) {
                    res.status(400).send(JSON.stringify({
                        "status": 400,
                        "msg": "err",
                        "response": "Gagal Authorization Token"
                    }))
                } else {
                    console.log(decode)
                    req.auth = decode;
                    next();
                }
            });
            // req.auth = decode;
            // next();
        } else {
            res.send(JSON.stringify({
                "status": 400,
                "msg": "err",
                "response": "Token Tidak Tersedia."
            }));
        }
    }
}

module.exports = { verifikasi }