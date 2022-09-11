const { connection } = require("../dbconfig/db");
const md5 = require("md5");
connection.connect((err) => {
    if (err) {
        throw err;
        connection.end();
    }
    console.log('connected');
});
const getAllUser = (req, res) => {
    // const { no_surat } = req.body;
    // const { ids } = req.query;
    // const { pp } = req.params;
    const d = new Date().toISOString();
    // console.log(no_surat);
    // console.log(d);
    const queries = "Select * From users";
    connection.query(queries, (err, results, fields) => {
        if (err) throw err;
        res.send({
                "status": 200,
                "error": null,
                "response": results
            });
    });
}
const getUserId = (req, res) => {
    let { id } = req.params;
    console.log(id)
    const queries = "Select * From users Where id = ?";
    connection.query(queries, [id], (err, results, fields) => {
        // console.log(results)
        if (err) {
            throw err;
            // console.log(err)
        } else {
            if (results.length !== 0) {

                res.send(JSON.stringify(
                    {
                        "status": 200,
                        "id": id,
                        "response": results
                    }
                ));
            } else {
                res.send(JSON.stringify(
                    {
                        "status": 401,
                        "id": id,
                        "response": "Id tidak ditemukan"
                    }
                )).status(404);;
            }
        }
    });
}

const createUser = (req, res) => {
    let { name, email, password } = req.body;
    var today = new Date();
    var registered = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const last_login = registered;
    let queri = "INSERT INTO users ( name, email, password, registered, last_login) values (?,?,?,?,?)";
    connection.query(queri, [name, email, md5(password), registered, last_login], (err, results, fields) => {
        if (err) {
            throw err
        } else {
            res.status(200).send(JSON.stringify({
                "status": "success",
                "msg": "User Berhasil ditambahkan"
            }));
        }
    });
}
const updateUser = (req, res) => {
    let { name, email, password, id } = req.body;
    var today = new Date();
    var last_login = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let queri = " Update  users set name = ?, email = ?, password = ?, last_login = ? where id = ?";
    connection.query(queri, [name, email, password, last_login, id], (err, results, fields) => {
        if (err) {
            res.status(500).send(JSON.stringify({
                "status": "gagal",
                "msg": err
            }));
        } else {
            res.status(200).send(JSON.stringify({
                "status": "success",
                "msg": "User Berhasil diupdate"
            }));
        }
    });
}

const deleteUser = (req, res) => {
    const { id } = req.params;
    console.log(id)
    let queri = "delete from users  where id = ?";
    connection.query(queri, [id], (err, results, fields) => {
        if (results.affectedRows == 1) {
            res.status(200).send(JSON.stringify({
                "status": "success",
                "msg": "User Berhasil dihapus"
            }));
        } else {
            res.status(400).send(JSON.stringify({
                "status": "failed",
                "msg": "id Tidak Ditemukan"
            }));
        }
    });
}
module.exports = { getAllUser, getUserId, createUser, updateUser, deleteUser }