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

// picking all quotes and the quotes directly from the owner.
app.get('/api/quotes', (req, res, next) => {
    const ownerQuotes = quotes.filter(author => {
    
    return author.person === req.query.person;
    });

    if (req.query.person) {
      res.send({ quotes: ownerQuotes });
    } else {
      res.send({ quotes: quotes });
    }
  }) 

// put a new quote inside. testing
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
    console.log(`Listening on port ${PORT}`);
})