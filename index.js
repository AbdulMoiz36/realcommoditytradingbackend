// Import packages
const express = require("express");
const home = require("./routes/home");
const VerifiedOffer = require("./routes/verified_offers");
const users_MongooseModel = require("./routes/users");
const usersRouter = require("./routes/users");
const mongoose = require('mongoose');
const cors = require('cors');
const res = require("express/lib/response");

const axios = require('axios');
const cheerio = require('cheerio');
const { v4: uuidv4 } = require('uuid');

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

// For Fetching data of top bar
class RealtimeScraper {
  constructor() {
      this.session = null;
      this.userAgent = ''; // You can use a library like 'random-useragent' to generate a random user agent
  }

  async initializeSession() {
      this.session = axios.create({
          headers: {
              'User-Agent': this.userAgent,
              'Host': 'markets.businessinsider.com'
          }
      });
  }

  async scrape() {
      const data = [];
      try {
          const response = await this.session.get('https://markets.businessinsider.com/commodities');
          const html = response.data;
          const $ = cheerio.load(html);

          $('tr.table__tr').each((index, element) => {
              const name = $(element).find('td.table__td.bold').text().trim();
              const price = $(element).find('div[data-field="Mid"]').text().trim();
              const percentage = $(element).find('div[data-field="ChangePer"]').text().trim();
              const abss = $(element).find('div[data-field="ChangeAbs"]').text().trim();
              const unit = $(element).find('td.table__td.text-right').text().trim();
              const date = $(element).find('div[data-field="MidTimestamp"]').text().trim();

              if (name !== '') {
                  data.push({
                      id: uuidv4(),
                      name: name,
                      price: price,
                      percentage: percentage,
                      abss: abss,
                      unit: unit,
                      date: date
                  });
              }
          });
      } catch (error) {
          return { error: `Error: ${error.message}` };
      }
      return data;
  }
}

const rs = new RealtimeScraper();

let first = true;

app.get('/businessinsider', async (req, res) => {
    if (first) {
        await rs.initializeSession();
        first = false;
    }

    const data = await rs.scrape();
    res.json(data);
});

// Start the server
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
