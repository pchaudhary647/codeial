const Post=require('../models/posts')
const User=require('../models/user')

module.exports.home=function(req,res){

    User.find({}, function(err,user){
    Post.find()
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users:user
        });
    })
}
)
}
// 
//  Post.find({}, function(err,posts){
 //   return res.render('home',{title : "welcome",posts: posts})
//  })
//