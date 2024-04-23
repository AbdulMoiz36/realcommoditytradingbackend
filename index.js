// Import packages
const express = require("express");
const home = require("./routes/home");
const VerifiedOffer = require("./routes/verified_offers");
const users_MongooseModel = require("./routes/users");
const usersRouter = require("./routes/users");
const mongoose = require('mongoose');
const cors = require('cors');
const res = require("express/lib/response");

// Middlewares
const app = express();

// Set up CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'https://realcommoditytrading.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Use JSON middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://moiz36:4RGR6pM_Yh-cx7z@cluster0.ocumynd.mongodb.net/realcommoditytrading')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


// Routes
app.use("/home", home);
app.use("/verified_offers", VerifiedOffer);
app.use("/users", users_MongooseModel);

// Start the server
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
