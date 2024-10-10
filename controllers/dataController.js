const axios = require('axios');
const {
  validateFlightQueryParams,
  validateHotelQueryParams,
  validateSiteQueryParams,
} = require('../validators');

const axiosInstance = axios.create({
  baseURL: process.env.MICROSERVICE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    CLIENT_KEY: process.env.CLIENT_KEY,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
  },
});

const getFlights = async (req, res) => {
  try {
    const response = await axiosInstance.get(`/flights`, {});
    // const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
};

const getFlightsByOriginAndDestination = async (req, res) => {
  const errors = validateFlightQueryParams(req.query);
  if (errors.length > 0) return res.status(400).json({ errors });

  const { origin, destination } = req.query;
  try {
    const response = await axiosInstance.get(
      `/flights/search?origin=${origin}&destination=${destination}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};

const getHotels = async (req, res) => {
  try {
    const response = await axiosInstance.get(`/hotels`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};
const getHotelsByLocation = async (req, res) => {
  const errors = validateHotelQueryParams(req.query);
  if (errors.length > 0) return res.status(400).json({ errors });

  const { location } = req.query;

  // Input validation
  if (!location) {
    return res.status(400).json({ error: 'Location is required.' });
  }

  try {
    const response = await axiosInstance.get(`/hotels/search?location=${location}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};

const getSites = async (req, res) => {
  try {
    const response = await axiosInstance.get(`/sites`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sites' });
  }
};

const getSitesByLocation = async (req, res) => {
  const errors = validateSiteQueryParams(req.query);
  if (errors.length > 0) return res.status(400).json({ errors });

  const { location } = req.query;

  // Input validation
  if (!location) {
    return res.status(400).json({ error: 'Location is required.' });
  }

  try {
    const response = await axiosInstance.get(
      `/sites/search?location=${encodeURIComponent(location)}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sites' });
  }
};

module.exports = {
  getSites,
  getHotels,
  getFlights,
  getSitesByLocation,
  getHotelsByLocation,
  getFlightsByOriginAndDestination,
};
