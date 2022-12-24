const Comment = require('../models/comment');
const Post = require('../models/posts');

module.exports.create = async function(req, res){

    
    try{  
        let post=  await    Post.findById(req.body.post) 

        if(post){
          let comment=  await   Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })

            

            post.comments.push(comment);
            post.save();
            res.redirect('/')
        }

    }
    catch(err){
       throw err
    }
}

module.exports.destroy=function (req,res){

    Comment.findById(req.params.id, function(err,comment){

        
        if(comment.user==req.user.id){
            let postID=comment.post

            comment.remove()

            Post.findByIdAndUpdate(postID, { $pull : {comments: req.params.id}},function(){
                return res.redirect('back')
            })
        }
        else{
            return res.redirect('back')
        }
    })
}