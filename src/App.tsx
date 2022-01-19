import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import { AnimatePresence } from "framer-motion";
import FadeIn from "./animations/FadeIn";
import Posts from "./pages/Posts";

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <AnimatePresence>
        <FadeIn>
          <Posts />
        </FadeIn>
      </AnimatePresence>
    </AppProvider>
  );
}
