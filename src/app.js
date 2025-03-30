import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import {addLogger,logger} from './utils/logger.js';
import __dirname from './utils/index.js';

dotenv.config({path: './src/.env'});

const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB connection with logging
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        logger.warning('Conectado a la base de datos => Mongo');
    })
    .catch((error) => {
        logger.error('Error conectando a la base de datos:', error);
        process.exit(1); // Exit the process if the connection fails
    });

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Adopme API',
            description: 'Nuestra primera documentación practicando con Swagger',
        },
    },
    apis: [`${__dirname}/../docs/**/*.yaml`],
};

const specs = swaggerJsDoc(swaggerOptions);

// Middleware
app.use(addLogger);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/documentacion', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);

// Start server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

export default app;