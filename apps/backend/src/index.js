import express from 'express';
import { config } from 'dotenv';
import authRouter from './routes/authRouter.js';
import oauthRouter from './routes/oauthRouter.js';

const app = express();
const PORT = process.env.APP_PORT || 3000;
config();

app.get('/', (req, res) => {
    console.log(process.env.APP_PORT);
    res.send('Hello World');
})

app.use('/api', authRouter);
app.use('/api', oauthRouter);

app.use((req, res) => {
    console.log(req.url);
    res.send('404 - Page Not Found');
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
    // connectToDB();
});