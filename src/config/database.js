const mongoose = require("mongoose")

const dbClient = async () => {
    mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}`)
        .then(() => console.log(`Database connected on ${process.env.DB_URL}:${process.env.DB_PORT} with ${process.env.DB_USER} credentials.`))
        .catch((err) => {
            console.log(err)
            process.exit()
        })
    // try {
    //     mongoose.set("strictQuery", false);
    //     await mongoose.connect(process.env.MONGO_URI, {});
    //     console.log("MongoDB Connected");
    // } catch (err) {
    //     console.error("Error connecting to MongoDB:", err.message);
    //     process.exit(1); // Exit process with failure
    // }
}


module.exports = dbClient