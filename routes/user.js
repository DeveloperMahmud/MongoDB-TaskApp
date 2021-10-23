const express = require('express');
const router = express.Router();
const {
    storeUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
} = require("../controllers/user");

router.post('/user', storeUser);
router.get('/user', getAllUser);
router.get('/user/:id', getSingleUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;