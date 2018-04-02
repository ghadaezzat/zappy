const mongoose=require('mongoose');


Schema=mongoose.Schema;

const postSchema=new Schema({
    screen_name:String,
    picture:String,
    tweeted_at:String,
    tweet_text:String

});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;