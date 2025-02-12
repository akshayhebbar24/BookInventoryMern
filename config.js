import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

export const PORT = process.env.PORT || 5555; // Default to 5555 if not set
export const mongodbUrl = process.env.MONGO_URI