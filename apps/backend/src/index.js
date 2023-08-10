import express from 'express';
import { config } from 'dotenv';
import authRouter from './routes/authRouter.js';
import oauthRouter from './routes/oauthRouter.js';
import sequelize from './db/index.js';
import kiteRouter from './routes/kiteRouter.js';
import User from './models/User.js';

const app = express();
const PORT = process.env.APP_PORT || 5000;
config();


app.use('/api', authRouter);
app.use('/api', oauthRouter);
app.use('/api', kiteRouter);

app.use((req, res) => {
    res.send('404 - Page Not Found');
});

async function connectToDB() {
    try {
        await sequelize.authenticate();
        console.log('Successfully connected to DB');
        await sequelize.sync({ alter: true });
    } catch(err) {
        console.log('Unable to connect to DB - ', err);
        process.exit(1);
    }
}

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
    connectToDB();
});