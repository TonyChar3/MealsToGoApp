const { onRequest } = require("firebase-functions/v2/https");
const { geocodeRequest } = require("./geocode/index");
const { placesRequest } = require("./places/index");

const { Client } = require("@googlemaps/google-maps-services-js");

const client = new Client({});

/**
 * Firebase cloud function
 */

exports.geocode = onRequest((request, response) => {
  geocodeRequest(request, response, client);
});

exports.placesNearby = onRequest((request, response) => {
  placesRequest(request, response, client);
});
