const mongoose=require("mongoose");

const mongourl="mongodb+srv://FoodDelivery:Food1234@cluster0.i45lvec.mongodb.net/FoodDeliveryMern?retryWrites=true&w=majority"
const MongoConn=async()=>{
try{
    await mongoose.connect(mongourl,{useNewUrlParser:true});
    console.log("connected");
    const fetched_data=mongoose.connection.db.collection("food_items");
    const data=await fetched_data.find({}).toArray();
    const food_Category=mongoose.connection.db.collection("food_category");
    const food_Category_data=await food_Category.find({}).toArray();
    global.food_items=data;
    global.food_category=food_Category_data;
}
catch(error)
{
    console.log("An error occured while connecting to database"+error);
}
}

module.exports= MongoConn;