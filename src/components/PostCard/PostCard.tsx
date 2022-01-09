import {
  MediaCard,
  ComplexAction,
  Card,
  Heading,
  Stack,
  ButtonGroup,
  buttonFrom,
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import Post from "../../interfaces/Post";
import { ThumbsUpMajor } from "@shopify/polaris-icons";

import styles from "./PostCard.module.css";
interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const handleLike = useCallback(() => setLiked((liked) => !liked), []);

  const primaryAction: ComplexAction | undefined = !liked
    ? {
        content: "Like",
        icon: ThumbsUpMajor,
        onAction: handleLike,
      }
    : {
        content: "Unlike",
        icon: ThumbsUpMajor,
        onAction: handleLike,
        destructive: true,
        outline: true,
      };

  return (
    <>
      <Card>
        <div className={styles.PostImageContainer}>
          <img
            src={post.url}
            alt={post.title}
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
        <Card.Section>
          <Stack vertical spacing="tight">
            <Heading>
              {post.title} | {post.date}
            </Heading>
            <p> {post.explanation} </p>

            <div className={styles.Action}>
              <ButtonGroup>{buttonFrom(primaryAction)}</ButtonGroup>
            </div>
          </Stack>
        </Card.Section>
      </Card>
    </>
  );
};

export default PostCard;
