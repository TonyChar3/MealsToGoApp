const { mocks, addMocksImages } = require("./mock");
const url = require("url");

const addGoogleImage = (restaurant) => {
  const ref = restaurant.photos[0].photo_reference;
  if (!ref) {
    restaurant.photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ];
    return restaurant;
  }
  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${process.env.GOOGLE_API_KEY}`,
  ];
  return restaurant;
};

module.exports.placesRequest = (req, res, client) => {
  const { location, mock } = url.parse(req.url, true).query;
  const PlacesLocation = location.split(",");
  if (mock === "true") {
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addMocksImages);
    }
    return res.json(data);
  }
  client
    .placesNearby({
      params: {
        location: { lat: PlacesLocation[0], lng: PlacesLocation[1] },
        radius: 1500,
        type: "restaurant",
        key: process.env.GOOGLE_API_KEY,
      },
      timeout: 1000,
    })
    .then((response) => {
      console.log("API Response:", response.data);
      response.data.results = response.data.results.map(addGoogleImage);
      return res.json(response.data);
    })
    .catch((e) => {
      console.error("API Error:", e); // Log the complete error
      res.status(400);
      if (e.response && e.response.data) {
        return res.send(e.response.data.error_message);
      }
      return res.send(
        "An error occurred while fetching data from the Google Places API",
      );
    });
};
