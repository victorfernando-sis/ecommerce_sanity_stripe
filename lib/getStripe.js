import { loadStripe } from '@stripe/stripe-js'

let stripePromisse;

const getStripe = () => {
    if (!stripePromisse) {
        stripePromisse = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)
    }
    return stripePromisse
}
export default getStripe