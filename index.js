require('dotenv').config();
PORT= process.env.PORT;

const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
var cors = require('cors');


app.use(cors({
    origin: '*'
}));
app.use(cookieParser());
app.use(express.json());


const routeController = require('./routes/v1/')();


app.get('/',(req,res)=>{
    res.send("asd");
});

app.use('/api/v1',routeController);


app.listen(PORT,()=> console.log(`Server running at port ${PORT}`));
