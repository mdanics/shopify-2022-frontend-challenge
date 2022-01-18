import { AnimatePresence } from "framer-motion";
import FadeIn from "./animations/FadeIn";
import Posts from "./pages/Posts";

export default function App() {
  return (
    <AnimatePresence>
      <FadeIn>
        <Posts />
      </FadeIn>
    </AnimatePresence>
  );
}
