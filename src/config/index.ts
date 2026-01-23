import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    cloudinary:{
        api_secret: process.env.CLOUDINARY_API_SECRET,
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY
    },
    token:{
        secret: process.env.JWT_SECRET as string,
        expireIn: process.env.JWT_EXPIRES_IN as string,
        algorithm: process.env.JWT_ALGORITHM as string
    },
    openRouterApiKey: process.env.OPENROUTER_API_KEY,
    stripeSecretkey: process.env.STRIPE_SECRET_KEY,

}