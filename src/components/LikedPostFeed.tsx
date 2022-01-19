import { Card, EmptyState } from "@shopify/polaris";
import Post from "../interfaces/Post";
import PostFeed, { PostFeedProps } from "./PostFeed";
import EmptyStateImage from "../images/LikesEmptyState.png";

import { SearchMajor, SearchMinor } from "@shopify/polaris-icons";
import { useState } from "react";
import SkeletonImage from "./Skeletons/SkeletonImage";

export interface LikedPostFeedProps extends PostFeedProps {
  handleEmptyStateAction: () => void;
}

const LikedPostFeed = (props: LikedPostFeedProps) => {
  // show empty state if we don't have any liked posts
  const { posts, handleEmptyStateAction } = props;
  const [imagedLoaded, setImageLoaded] = useState(false);

  // create skeleton for empty state image loading
  const emptyStateImage = new Image();
  emptyStateImage.src = EmptyStateImage;
  emptyStateImage.onload = () => {
    setImageLoaded(true);
  };

  if (!posts || posts.length === 0) {
    return (
      <Card>
        <Card.Section>
          {!imagedLoaded && <SkeletonImage height={400} />}
          {imagedLoaded && (
            <EmptyState
              image={EmptyStateImage}
              action={{
                content: "Explore",
                icon: SearchMinor,
                onAction: handleEmptyStateAction,
              }}
              heading="Explore posts"
            >
              <p>
                You haven't like any posts yet. Check out the Explore tab to
                view posts and like your favourite ones.
              </p>
            </EmptyState>
          )}
        </Card.Section>
      </Card>
    );
  }

  return <PostFeed {...props} />;
};

export default LikedPostFeed;
