const User = require('../models/user');
const Post=require('../models/posts')
const path=require('path')
const fs=require('fs')


module.exports.profile = function(req, res){

    const user=User.findById(req.params.id)

User.findById(req.params.id ,function(err,user){
Post.find({},function(err,post){
    return res.render('user_profile', {
        title: 'User Profile',
        post:post,
        user_profile:user
    })
})
})
}




// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}



// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){

        
        return res.redirect('/');
    }
    return res.render('user_sign_in',{title:"sign in"})
}

// get the sign up data
module.exports.create = function(req, res){


    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
      });
}


module.exports.update= async function(req,res){
    
 //   if(req.user.id==req.params.id){
   //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
     //       return res.redirect('back')
 //       } )
  //  }
  //  else{
    //    return res.status(401)
   // }


   if(req.user.id==req.params.id){
    try {
         
        let user=await User.findById(req.params.id)

        
         User.uploadedAvatar(req,res,function(err){
            if(err){
                console.log("multer error**************")
                console.log(err)
            }
            user.name=req.body.name;
            user.email=req.body.email
             
            
            if (req.file){

               if (user.avatar){
                   fs.unlinkSync(path.join(__dirname, '..', user.avatar));
             }

              //  this is saving the path of the uploaded file into the avatar field in the user
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save()
         })



    } catch (error) {
        
    }
   }
   else{
    return res.status(401).send('unauthorised')
   }
}

