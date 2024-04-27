const axios = require('axios');
const cheerio = require('cheerio');
const { v4: uuidv4 } = require('uuid');

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

const express = require('express');
const app = express();

const rs = new RealtimeScraper();

let first = true;

app.get('/', async (req, res) => {
    if (first) {
        await rs.initializeSession();
        first = false;
    }

    const data = await rs.scrape();
    res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
