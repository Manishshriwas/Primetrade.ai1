import mongoose from 'mongoose'



const URI = process.env.MONGODB_URI;


const connectdb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to database");
    } catch (error) {
        console.error("error while connecting to database");
        process.exit(0);
    }
};

export default connectdb;
 