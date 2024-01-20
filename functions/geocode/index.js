const { locations: locationsMock } = require("./geocode.mock");

module.exports.geocodeRequest = (req, res, client) => {
  const { city, mock } = req.query;
  if (mock === "true") {
    const decodedCity = decodeURIComponent(city);
    const locationMock = locationsMock[decodedCity.toLowerCase()];
    return res.json(locationMock);
  }
  client
    .geocode({
      params: {
        address: city,
        key: process.env.GOOGLE_API_KEY,
      },
      timeout: 1000,
    })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((e) => {
      res.status(400);
      return res.send(e.response.data.error_message);
    });
};
