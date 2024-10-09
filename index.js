const cors = require('cors');
const express = require('express');
require('dotenv').config();
const { createItinerary, getItinerary } = require('./controllers/itineraryController');
const {
  getFlights,
  getHotels,
  getSites,
  getFlightsByOriginAndDestination,
  getHotelsByLocation,
  getSitesByLocation,
} = require('./controllers/dataController');
const app = express();
const { sequelize } = require('./models');

app.use(express.json());
app.use(cors());

app.post('/itineraries/', createItinerary);
app.get('/itineraries/:id', getItinerary);

app.get('/data/flights', getFlights);
app.get('/data/flights/search', getFlightsByOriginAndDestination);
app.get('/data/hotels', getHotels);
app.get('/data/hotels/search', getHotelsByLocation);
app.get('/data/sites', getSites);
app.get('/data/sites/search', getSitesByLocation);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
