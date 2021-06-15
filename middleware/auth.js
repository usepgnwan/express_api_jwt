const { connection } = require("../dbconfig/db");
const md5 = require("md5");
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const ip = require('ip');

const login = (req, res) => {
    let { email, password } = req.body;
    let queri = "Select * From users where email = ? and password = ?";
    connection.query(queri, [email, md5(password)], (error, results, field) => {
        if (results.length != 0) {
            const token = jwt.sign({ results }, config.secret, {
                expiresIn: 100
            });
            res.send(JSON.stringify(
                {
                    "status": 200,
                    "msg": "success",
                    "response": "Berhasil Login",
                    "ip": ip.address(),
                    token: token
                }
            ));
        } else {
            res.send(JSON.stringify(
                {
                    "status": 400,
                    "msg": "err",
                    "response": "email Atau Password Salah."
                }
            ));
        }
    });
}

module.exports = { login };