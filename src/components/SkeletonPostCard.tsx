import {
  Card,
  Stack,
  Heading,
  ButtonGroup,
  buttonFrom,
  SkeletonDisplayText,
  SkeletonBodyText,
} from "@shopify/polaris";

import styles from "./PostCard/PostCard.module.css";

const SkeletonPostCard = () => {
  return (
    <Card>
      <div className={styles.PostImageContainer}>
        <div className={styles.SkeletonImage} />
      </div>
      <Card.Section>
        <Stack vertical spacing="tight">
          <SkeletonDisplayText />
          <SkeletonBodyText lines={15} />
          <div className={styles.Action}>
            <SkeletonDisplayText size="extraLarge" />
          </div>
        </Stack>
      </Card.Section>
    </Card>
  );
};

export default SkeletonPostCard;