import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('connected to DB');
        })

        connection.on('error', (error) => {
            console.log('error connecting to DB');
            console.log(error);
            process.exit(1);
        })
    } catch (error){
        console.log('something went wrong in connecting to DB');
        console.log(error);
    }
}