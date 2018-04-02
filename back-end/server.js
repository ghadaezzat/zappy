const express = require('express');
const app=express();
const mongoose =require('mongoose');
const bosyParser=require('body-parser');
const twit=require('twitter');
const twitter_api=require('./twitter.js');
const Post=require('./models/tweets');
mongoose.connect('mongodb://localhost:27017/zappy');
const router = new express.Router();
router.post('/slack/command/report',  (req, res) => {
    try {
      const slackReqObj = req.body;
      const response = {
        response_type: 'in_channel',
        channel: slackReqObj.channel_id,
        text: 'go'
      };
      console.log(res);
      return res.json(response);
    } catch (err) {
      log.error(err);
      return res.status(500).send('Something blew up. We\'re looking into it.');
    }
  });
  

const port=4600;
app.get('/', function(req, res) {
    res.send('Hello World')
  })



twitter = new twit({
    consumer_key:twitter_api.CONSUMER_KEY,
    consumer_secret:twitter_api.CONSUMER_SECRET,
    access_token_key:twitter_api.ACCESS_TOKEN_KEY,
    access_token_secret:twitter_api.ACCESS_TOKEN_SECRET
});

twitter.get('statuses/user_timeline',{ screen_name:'dodo_ezzat',count:1}, function(error, tweets, response) {
    
    if(error){
        console.log(error);
    }
    if(tweets){
        for (let tweet in tweets){
        
           let post=new Post({
               screen_name:tweets[tweet].user.screen_name,
               picture:tweets[tweet].user.profile_image_url,
               tweeted_at:tweets[tweet].created_at,
               tweet_text:tweets[tweet].text

           });
           post.save(err => {  
            if (err) {
                return err;
            }else{
                console.log("successfully added to zappy");
                return "successfully added to zappy";
            }
        });


        }

    }
});

app.listen(port,(req,res)=>{
    console.log('running on '+port);
})

