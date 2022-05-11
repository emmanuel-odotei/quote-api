const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.get('/api/quotes/random', (req, res, next) => {
  res.send({
    quote: getRandomElement(quotes)
  });
});

app.get('/api/quotes', (req, res, next) => {
  if(req.query.person !== undefined) {
    const personQuote = quotes.filter(quote => quote.person === req.query.person);
    res.send({
      quotes: personQuote
    });
  } else {
    res.send({
      quotes: quotes
    });
  }
});

app.post('/api/quotes', (req, res, next) => {
  const addQuote = {
    quote: req.query.quote,
    person: req.query.person
  }
   if (addQuote.quote && addQuote.person) {  
     quotes.push(addQuote);
     res.send({quote:addQuote})
   } else {
     res.status (400).send();
   }
})
app.listen(PORT);