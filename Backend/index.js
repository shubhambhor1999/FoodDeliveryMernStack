const express=require("express");
const MongoConn =require("./db.js");

const app = express();
const port = 5000;

MongoConn();
app.use((req,res,next)=>
{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})
app.use(express.json());
app.use('/api',require("./Routes/CreateUser.js"));
app.use('/api',require("./Routes/DisplayData.js"));
app.use('/api',require("./Routes/OrderData.js"));
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
