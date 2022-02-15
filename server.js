const app = require("./Backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
const dotenv = require('dotenv');
const exp =require('express')


process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

app.use(exp.json());
app.use(exp.static(`${__dirname}/public`));

// for invalid path  
 app.all('*',(req, res, next) => {
   res.send({ message: `${req.url} is not a valid path` });
 });


 const port = 3000;
 app.listen(port, () => {
   console.log(`server started on port ${port} successfully!😎`);
 });


//  should be at last
 process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
