const express = require('express')
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/urlRoutes");
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const PORT = 8001;

dotenv.config()


app.use(cors({ 
    origin: '*'
}))

connectToMongoDB(process.env.MONGODB_URL)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err))

app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, () => {
    console.log(`Server Started At Port:${PORT}`)
})
