//Server

const express = require("express");
const mongoose = require('mongoose');

const UserRoutes = require ('./app/Routers/UserRoutes');
const ProductRoutes = require ('./app/Routers/ProductRoutes');
const LogRoutes = require ('./app/Routers/logRoutes');
const OrderRoutes = require ('./app/Routers/OrderRoutes');

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api',OrderRoutes);
app.use('/api',UserRoutes);
app.use('/api',LogRoutes);
app.use('/api',ProductRoutes);

mongoose.connect('mongodb+srv://ReactApp:ReactApp@reactapp.h3oylgt.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Running on port 3000!');
    });
}).catch((err) => {
    console.log(err);
});
