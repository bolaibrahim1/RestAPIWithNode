const express = require('express')
const app = express();
const PORT = 3000;
const dotenv = require('dotenv');

//Import our Config
dotenv.config();

// Import Mongoose and connect to DB
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT,
                    { useUnifiedTopology: true,  useNewUrlParser: true},
                    () => {console.log('connected To DB', process.env.DB_CONNECT);}
            );

// Enable Request Body Parser
app.use(express.json());


//Import Routes
const authRoute = require('./routes/auth');
const webRoute = require('./routes/web');
 
//Build Prefixed Route - Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/product', webRoute);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});