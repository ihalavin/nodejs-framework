"use strict";

const dotenv = require('dotenv');
const Kernel = require('./MyFramework/Kernel');
const UserRouter = require('./src/Router/UserRouter');
const jsonMiddleware = require('./src/Middleware/SendJsonMiddleware');

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = new Kernel();
app.use(jsonMiddleware);
app.addRouter(UserRouter);

app.listen(PORT);
