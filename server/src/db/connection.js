import mongoose from 'mongoose';

if (process.env.DB) {
    mongoose
        .connect(process.env.DB)
        .then(() => console.log('Connection is successful'))
        .catch((err) => console.log(err));
} else {
    console.error('No connection string provided in process.env.DB');
}