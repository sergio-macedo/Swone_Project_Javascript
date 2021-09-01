const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// get a random quote
app.get('/api/quotes/random', (req, res, next) => {
    const quotation = getRandomElement(quotes);
    res.send({quote:quotation});
   
});

 // get all the quotes 
app.get('/api/quotes', (req, res, next ) => {
    res.send({quote:quotes});
});

// get all the quotes from a especific person TODO
app.get('/api/quotes?person', (req, res, next) => {
    const quoteOwner = {
        quote: req.query.person
    };
    if(quoteOwner) {
        res.send({quote:quoteOwner});
    } else {
        res.send();
    }
});

app.post('/api/quotes', (req, res, next) => {
    const newQuotation = {
        quote: req.query.quote, person: req.query.person
    };
    if(newQuotation.quote && newQuotation.person) {
        quotes.push(newQuotation);
        res.send({quote:newQuotation});
    } else {
        res.status(400).send();
    }
});




app.listen(PORT, () => {
    console.log(`Linstening on port ${PORT}`);
})