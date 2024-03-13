const shortid = require("shortid");
const URL = require('../models/urlSchema');

async function handleGenerateNewShortUrl(req,res) {
  const body = req.body;
  if(!body.url) return res.status(400).json( {error: 'url is required' } )
  const shortID = shortid();
 await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: []
});

 return res.json ({ id: shortID });
}


async function handleRedirectUrl(req, res) {
    try {
        const shortId = req.params.shortId;
        console.log(shortId)
    
        const entry = await URL.findOneAndUpdate(
         {
           shortId
         },
         {
            $push: {
            visitHistory: {
              timestamp: Date.now(),
            }
            },
         }
           );
      res.redirect(entry.redirectUrl);
      }
      catch(err) {
        console.log(err)
      }
}

async function handleGetAnalytics(req, res)
{
  const shortId = req.params.shortId;
  const result= await URL.findOne({ shortId });
  return res.json(
    { 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleRedirectUrl,
    handleGetAnalytics,
};
