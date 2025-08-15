import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string
if(!MONGO_URI){
    throw new Error("Plase define the mongoDb_Uro variable inside .env.local")
}

type CachedMongoose = {
    conn : typeof mongoose | null;
    promise:Promise<typeof mongoose> | null
}

const cached = (globalThis as unknown as {mongooseCache:CachedMongoose }).mongooseCache || {conn:null ,promise:null}

export async function connectDB():Promise<typeof mongoose>{
    if(cached.conn && cached.conn.connection.readyState === 1){
        return cached.conn
    }

    if(cached.promise){
        cached.conn = await cached.promise
        return cached.conn
    }
    console.log("Established as new Connetion mongodb")
    cached.promise = mongoose.connect(MONGO_URI,{
        bufferCommands : false
    }).then((m) =>{
        cached.conn = m;
        cached.promise = null;
        return m;
    }).catch((error)=> {
        console.error("mongo connectiomn error :",error);
        cached.promise = null;
        throw error
    })
    
    cached.conn = await cached.promise;
     (globalThis as unknown as {mongooseCache:CachedMongoose }).mongooseCache = cached
     return cached.conn
}