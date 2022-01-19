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
import FadeIn from "../../animations/FadeIn";
import { formatDate } from "../../utils/DateUtils";
interface PostCardProps {
  post: Post;
  saveLikedPost: (post: Post) => void;
  unsaveLikePost: (post: Post) => void;
}

const PostCard = ({ post, saveLikedPost, unsaveLikePost }: PostCardProps) => {
  const [liked, setLiked] = useState(post.liked);

  const handleLike = useCallback(() => {
    if (liked) {
      // post is already liked so remove it from liked posts
      unsaveLikePost(post);
    } else {
      // post has not been liked, so add it to the liked posts
      saveLikedPost(post);
    }

    setLiked((liked) => !liked);
  }, [liked]);

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
    <Card>
      <FadeIn>
        <div
          className={styles.PostImageContainer}
          onDoubleClick={handleLike}
          data-testid="image-container"
        >
          <img
            src={post.url}
            alt={post.title}
            width="100%"
            height="100%"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              minHeight: 200,
            }}
          />
        </div>
        <Card.Section>
          <Stack vertical spacing="tight">
            <Heading>
              {post.title} | {formatDate(post.date)}
            </Heading>
            <p> {post.explanation} </p>

            <div className={styles.Action}>
              <ButtonGroup>{buttonFrom(primaryAction)}</ButtonGroup>
            </div>
          </Stack>
        </Card.Section>
      </FadeIn>
    </Card>
  );
};

export default PostCard;
