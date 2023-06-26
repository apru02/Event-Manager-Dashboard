const express = require("express");
const router = express.Router();
const { signup, getbill } = require('../controllers/sendmail')


/** HTTP Reqeust */
router.post('/user/signup', signup);
router.post('/product/getbill', getbill);


module.exports = router;