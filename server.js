//mongoDB setup
require("./config/db");


const app = require("express")();
// const port = process.env.PORT || 3000;
const port = 5000;

//cors 
const cors = require("cors"); 
app.use(cors());

const UserRouter = require("./api/User");

// For accepting post form data .... i.e. we are picking up data from the body of the request
const bodyParser = require("express").json; 
app.use(bodyParser());
app.use("/user", UserRouter);

//express setup and we can now start the server and start listening for requests
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
