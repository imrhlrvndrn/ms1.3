const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    CLIENT_KEY: '4ccd21d8-c02f-4a33-b7e9-afe520204eed',
    CLIENT_SECRET: '0290f1b7-eadf-411d-8be1-b01355fdd483a',
  },
});

// const MICROSERVICE_BASE_URL = 'https://trip-planner-invact.vercel.app/api/v1'; // Replace with actual URL
// const MICROSERVICE_BASE_URL = 'http://localhost:8000/api/v1'; // Replace with actual

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

const getHotels = async (req, res) => {
  try {
    const response = await axios.get(`${MICROSERVICE_BASE_URL}/hotels`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};

const getSites = async (req, res) => {
  try {
    const response = await axios.get(`${MICROSERVICE_BASE_URL}/sites`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sites' });
  }
};

module.exports = { getFlights, getHotels, getSites };
