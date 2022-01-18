import { Card, EmptyState } from "@shopify/polaris";
import Post from "../interfaces/Post";
import PostFeed, { PostFeedProps } from "./PostFeed";
import EmptyStateImage from "../images/LikesEmptyState.png";

import { SearchMajor, SearchMinor } from "@shopify/polaris-icons";

const LikedPostFeed = (props: PostFeedProps) => {
  // show empty state if we don't have any liked posts
  const { posts } = props;
  console.log("here we are", posts);
  if (!posts || posts.length === 0) {
    return (
      <Card>
        <Card.Section>
          <EmptyState
            image={EmptyStateImage}
            action={{ content: "Explore", icon: SearchMinor }}
            heading="Explore posts"
          >
            <p>
              You haven't like any posts yet. Check out the Explore tab to view
              posts and like your favourite ones.
            </p>
          </EmptyState>
        </Card.Section>
      </Card>
    );
  }

  return <PostFeed {...props} />;
};

export default LikedPostFeed;
