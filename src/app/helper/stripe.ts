import Stripe from "stripe";
import config from "../../config";

export const stripe = new Stripe(config.stripeSecretkey as string);
