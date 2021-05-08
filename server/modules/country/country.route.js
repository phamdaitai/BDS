const express = require('express');
const router = express.Router();
const Country = require('./country.controller');

router.get('/province', Country.getProvinces);
router.get('/district', Country.getDistricts);
router.get('/ward', Country.getWards);

module.exports = router;