import {
  PolarisTestProvider,
  WithPolarisTestProviderOptions,
} from "@shopify/polaris";
import { createMount } from "@shopify/react-testing";
import enTranslations from "@shopify/polaris/locales/en.json";

export const mountWithApp = createMount<
  WithPolarisTestProviderOptions,
  WithPolarisTestProviderOptions
>({
  context(options) {
    return options;
  },
  render(element, context) {
    return (
      <PolarisTestProvider i18n={enTranslations} {...context}>
        {element}
      </PolarisTestProvider>
    );
  },
});
