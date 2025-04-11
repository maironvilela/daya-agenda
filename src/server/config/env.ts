import * as dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.HTTP_PORT || 3000,
};