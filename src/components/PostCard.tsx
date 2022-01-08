import { MediaCard, ComplexAction } from "@shopify/polaris";
import { useCallback, useState } from "react";
import Post from "../interfaces/Post";
import { ThumbsUpMajor } from "@shopify/polaris-icons";

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
    <MediaCard
      title={`${post.title} | ${post.date}`}
      description={post.explanation}
      portrait
      primaryAction={primaryAction}
    >
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
    </MediaCard>
  );
};

export default PostCard;
