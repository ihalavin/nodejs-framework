"use strict";

const dotenv = require('dotenv');
const Kernel = require('./MyFramework/Kernel');
const UserRouter = require('./src/Router/UserRouter');
const jsonMiddleware = require('./src/Middleware/SendJsonMiddleware');
const mongoose = require("mongoose");

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = new Kernel();
app.use(jsonMiddleware);
app.addRouter(UserRouter);

const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://igpyspam:Ak7RKehLvr0rLW8N@cluster0.1jmf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

        app.listen(PORT);
    } catch (err) {
        console.error(err);
    }
}

start();
