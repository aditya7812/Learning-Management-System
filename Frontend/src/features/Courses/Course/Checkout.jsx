import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import { useCreateSessionMutation } from "../../../reducers/api/paymentApi";

export default function Checkout() {
  const { courseId } = useParams();
  const [createSession] = useCreateSessionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PROMISE);

      const response = await createSession({ courseId }).unwrap();
      if (!response.success) {
        return;
      }
      const result = await stripe.redirectToCheckout({
        sessionId: response.id,
      });
      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="bg-purple-600 font-bold p-3 text-center w-full text-white  border-black"
    >
      Buy Now
    </button>
  );
}
