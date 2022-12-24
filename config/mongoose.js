const mongoose=require("mongoose")

mongoose.connect('mongodb+srv://pradeep647:pradeep647@cluster0.chrdwzx.mongodb.net/codeial?retryWrites=true&w=majority');

const db=mongoose.connection

db.once("open",()=> {
    console.log("connected to mongoose")
})



module.exports=db