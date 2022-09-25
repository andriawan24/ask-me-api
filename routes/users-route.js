const express = require('express');
const { getUsers, insertUser } = require('../services/user-service');

const router = express.Router();

router.get('/', getUsers);
router.post('/', insertUser);

module.exports = router;
