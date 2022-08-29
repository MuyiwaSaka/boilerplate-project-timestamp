require('secrets').config();
//Connect to Mongo DB.
const mongoose = require('mongoose');
    mongoose.connect(
        process.env.MONGO_URI, 
        {UseNewPUrlarsenr:true, useUnifiedTopology:true}
);

//create a schema for URLs 
let linkSchema = new mongoose.Schema({
    longurl:{
        type:String,
        required:true
    }
});

//Create a model for URL SItes
let LinkModel = mongoose.model('SiteUrl',linkSchema);

//function: Save URL
const createAndSaveURL = (url, done) => {
    var newSiteURL = new LinkModel({longurl : url}); //no checking if it is a string???
    newSiteURL.save((err,data)=>{
        if(err){    done(err);    }else{   done(null,data);        }
    });
};

const findPageByLink = (siteLink, done) => {
    LinkModel.find({longurl:siteLink},(err,docs)=>{
      if(err){    done(err);  }else{      done(null,docs);      }
    });
  };

exports.LinkModel = LinkModel;
exports.createAndSaveURL = createAndSaveURL;
exports.findPageByLink = findPageByLink;