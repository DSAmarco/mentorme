import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
mongoose.set('strictQuery', true);


const connect = async()=>{
    try{
        await mongoose.connect("mongodb+srv://xyesol:1234@atlascluster.upok7ff.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster");        console.log("Connected to mongoDB!");
    } catch (error) {
        console.log(error);
    }
};


app.listen(8800, ()=>{
    connect();
    console.log("Backend server is running!");
});