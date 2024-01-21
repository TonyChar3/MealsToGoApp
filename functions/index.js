const { onRequest } = require("firebase-functions/v2/https");
const { geocodeRequest } = require("./geocode/index");
const { placesRequest } = require("./places/index");
const { payRequest } = require("./pay/index");

const { Client } = require("@googlemaps/google-maps-services-js");
const stripeClient = require("stripe")(process.env.STRIPE_SECRET_API_KEY);
const googleClient = new Client({});

/**
 * Firebase cloud function
 */

exports.geocode = onRequest((request, response) => {
  geocodeRequest(request, response, googleClient);
});

exports.placesNearby = onRequest((request, response) => {
  placesRequest(request, response, googleClient);
});

exports.pay = onRequest((request, response) => {
  payRequest(request, response, stripeClient);
});
