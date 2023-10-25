const express=require("express");
const MongoConn =require("./db.js");
const cors=require('cors')

const app = expcdress();
const port = process.env.PORT || 5000;

MongoConn();

app.use(cors(
  {
    origin:["https://food-delivery-mern-stack.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  } 
))
// app.use((req,res,next)=>
// {
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin,X-Requested-With,Content-Type,Accept"
//     );
//     next();
// })
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api',require("./Routes/CreateUser.js"));
app.use('/api',require("./Routes/DisplayData.js"));
app.use('/api',require("./Routes/OrderData.js"));
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
