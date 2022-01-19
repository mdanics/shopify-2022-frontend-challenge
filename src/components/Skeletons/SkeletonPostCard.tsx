import {
  Card,
  Stack,
  SkeletonDisplayText,
  SkeletonBodyText,
} from "@shopify/polaris";
import FadeIn from "../../animations/FadeIn";

import styles from "../PostCard/PostCard.module.css";
import SkeletonImage from "./SkeletonImage";

const SkeletonPostCard = () => {
  return (
    <Card>
      <FadeIn>
        <SkeletonImage />
        <Card.Section>
          <Stack vertical spacing="tight">
            <SkeletonDisplayText />
            <SkeletonBodyText lines={15} />
            <div className={styles.Action}>
              <SkeletonDisplayText size="extraLarge" />
            </div>
          </Stack>
        </Card.Section>
      </FadeIn>
    </Card>
  );
};

export default SkeletonPostCard;
