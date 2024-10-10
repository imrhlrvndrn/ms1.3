// Validate flight query parameters
const validateFlightQueryParams = (query) => {
  const errors = [];
  if (!query.origin) {
    errors.push('Origin is required.');
  }
  if (!query.destination) {
    errors.push('Destination is required.');
  }
  return errors;
};

// Validate hotel query parameters
const validateHotelQueryParams = (query) => {
  const errors = [];
  if (!query.location) {
    errors.push('Location is required.');
  }
  return errors;
};

// Validate site query parameters
const validateSiteQueryParams = (query) => {
  const errors = [];
  if (!query.location) {
    errors.push('Location is required.');
  }
  return errors;
};


module.exports = {
  validateFlightQueryParams,
  validateHotelQueryParams,
  validateSiteQueryParams
  
}