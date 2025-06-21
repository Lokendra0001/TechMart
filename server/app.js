require('dotenv').config();
require("./config/mongoose-connection");
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const IndexRoute = require('./routes');
const UserRoute = require('./routes/userRouter');
const ProductRoute = require('./routes/productRouter');
const AdminRoute = require('./routes/adminRouter');
const OrderRoute = require('./routes/orderRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const allowedOrigins = ['http://localhost:5173', 'https://tech-mart-seven.vercel.app/', 'https://techmart-4rsb.onrender.com'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));



app.use('/', IndexRoute)
app.use('/user', UserRoute)
app.use('/product', ProductRoute)
app.use('/admin', AdminRoute);
app.use('/orders', OrderRoute)

app.listen(PORT, () => console.log(`Server Started At ${PORT}`));