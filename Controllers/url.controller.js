const URL = require('../Models/url.model.js')
const shortid = require('shortid');

const GenerateShortURL = async (req,res)=>{
    try {
        // Get data from body
        const { url } = req.body;
    
        // Validate input
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }
    
        // Generate short ID
        const shortId = shortid.generate();
    
        // Add data to the database
        const newUrl = new URL({
            shortId: shortId,
            redirectURL: url, // Ensure `url` is a string
            visitHistory: []
        });
        
        await newUrl.save();
    
        // Send response
        res.status(200).json({ id: shortId });
    } catch (error) {
        console.error('Error while generating short URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
}

const gotoURL = async(req,res)=>{
    try {
         //get url from params
    const shortId = req.params.shortId;

    //find and update visited history
    const entry = await URL.findOneAndUpdate(
        {shortId},
        {$push: 
            {visitHistory: [{timestamp: Date.now()}]}})

    //redirect to the url
    res.redirect(entry.redirectURL)
    } catch (error) {
        console.log(error);
        
    }
   
}

module.exports = {
    GenerateShortURL,
    gotoURL
}