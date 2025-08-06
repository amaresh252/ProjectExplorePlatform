const  mongoose=require('mongoose');
const  {Schema}=mongoose;


const project=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image_url:{type:String,required:true},
    code_url:{type:String,required:true},
    live_url:{type:String,required:true},
    comments:[String],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
},{timestamps:true})

 
const Project=mongoose.model('Project',project);
module.exports=Project 