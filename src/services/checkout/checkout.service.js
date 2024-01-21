import { STRIPE_PUBLIC_API_KEY } from "@env";
import createStripe from "stripe-client";
import { hostPayment } from "../../utils/env";

const stripe = createStripe(STRIPE_PUBLIC_API_KEY);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = async (token, amount, name) => {
  return fetch(`${hostPayment}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("something went wrong processing your payment");
    }
    return res.json();
  });
};
