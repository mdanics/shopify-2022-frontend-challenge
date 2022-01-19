import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Frame } from "@shopify/polaris";
import { AnimatePresence } from "framer-motion";
import FadeIn from "./animations/FadeIn";
import Home from "./pages/Home";

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <AnimatePresence>
        <FadeIn>
          <Frame>
            <Home />
          </Frame>
        </FadeIn>
      </AnimatePresence>
    </AppProvider>
  );
}
