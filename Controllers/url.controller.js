const URL = require('../Models/url.model.js')
const shortid = require('shortid');

const GenerateShortURL = async (req,res)=>{
    try {
        //get data from body
        const body = req.body

        //validate it
        if(!body.url){
            return res.status(400).json({error: 'Url is Required'})
        }

        //generate short ID
        const shortId = shortid()

        //add data to database
        const url = new URL({
            shortId: shortId,
            redirectURL:body.url,
            visitHistory: []
        })
        await url.save();

        //give response
        res.status(200).json({id:shortId})
    } catch (error) {
        console.log('Error while Generating Short Url: ',error);
        
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