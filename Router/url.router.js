const express = require('express');
const path = require('path'); // Import path module
const { GenerateShortURL, gotoURL } = require('../Controllers/url.controller.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Views', 'index.html')); // Adjust path as needed
});
router.post('/', GenerateShortURL);

router.get('/:shortId', gotoURL);

module.exports = router;
