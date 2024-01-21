module.exports.payRequest = (req, res, stripeClient) => {
  const body = JSON.parse(req.body);
  const { token, amount, name } = body;
  stripeClient.paymentIntents
    .create({
      amount,
      currency: "CAD",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: {
          token,
        },
      },
      confirm: true,
    })
    .then((paymentIntent) => {
      res.json(paymentIntent);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send("Something went wrong during the payment");
    });
};
