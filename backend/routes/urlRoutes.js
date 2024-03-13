const express = require('express');
const {handleGenerateNewShortUrl, handleRedirectUrl,  handleGetAnalytics} = require("../controller/urlController")
const router = express.Router();

router.get('/:shortId', handleRedirectUrl)
router.post('/', handleGenerateNewShortUrl);

router.get("/analytics/:shortId",  handleGetAnalytics)

module.exports = router;

