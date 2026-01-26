import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import './src/db/connection.js';
import './src/chat/socket_io.js';

import all_listings from './src/routes/all_listings.js';
import register from './src/routes/register.js';
import add_item from './src/routes/add_item.js';
import profile from './src/routes/profile.js';
import delete_user from './src/routes/delete_user.js';
import signin from './src/routes/signin.js';
import logout from './src/routes/logout.js';
import base_endpoint from './src/routes/base_endpoint.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/db', all_listings);
app.use('/add_data', add_item);
app.use('/register', register);
app.use('/signin', signin);
app.use('/del', delete_user);
app.use('/profilec', profile);
app.use('/logout', logout);
app.use('/', base_endpoint);

export default app;
