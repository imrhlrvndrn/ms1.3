const axios = require('axios');

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
    const response = await axiosInstance.get(`/flights`, {
      headers: {
        CLIENT_KEY: process.env.CLIENT_KEY,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
      },
    });
    // const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
};

const getFlightsByOriginAndDestination = async (req, res) => {
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

const getSites = async (req, res) => {
  try {
    const response = await axiosInstance.get(`/sites`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sites' });
  }
};

module.exports = { getFlights, getFlightsByOriginAndDestination, getHotels, getSites };
