const mongoose=require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const productSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:String,
        required:true
    },
    discription:{
        type:String,
       
        
    },
    image:{
        type: [String],
        required:true
    },
    category:{
        type:ObjectId,
        ref:"Category"
    },
    createdBy:{
        type:ObjectId,
        ref:"User"


    }
},{
    timeStamp:true
}

)
// productSchema.post("FindOneAndDelete")

productSchema.post("findOneAndDelete", async function (doc) {
    console.log("deleting images")
  if (doc && doc.image && Array.isArray(doc.image)) {
    for (const filename of doc.image) {
      const filePath = path.join(__dirname, '../../uploads', filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', filePath, err);
        } else {
          console.log('Deleted file:', filePath);
        }
      });
    }
  }
});


// productSchema.method()


const Product=mongoose.model("Product",productSchema)
module.exports=Product