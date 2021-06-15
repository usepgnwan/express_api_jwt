const express = require('express');
const { getAllUser, getUserId, createUser, updateUser, deleteUser } = require('../controller/controller');

const { login } = require('../middleware/auth');
const { verifikasi } = require('../middleware/verifikasi');
const router = express.Router();

router.get('/user', verifikasi(), getAllUser);
router.get('/user/:id', getUserId);
router.post('/user', createUser);
router.put('/user', updateUser);
router.delete('/user/:id', deleteUser);

router.post('/login', login);

router.get('/hehe/', (req, res) => {
    res.send({
        msg: "hello"
    });
    // console.log("ggeegegege")
});


module.exports = { router }