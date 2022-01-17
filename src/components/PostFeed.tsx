import { Stack, Spinner } from "@shopify/polaris";
import Post from "../interfaces/Post";
import PostCard from "./PostCard";
import SkeletonPostCard from "./SkeletonPostCard";

export interface PostFeedProps {
  posts: Post[];
  saveLikedPost: (post: Post) => void;
  unsaveLikePost: (post: Post) => void;
  isFetching?: boolean;
}

// todo - fix this prop drilling
const PostFeed = ({
  posts,
  isFetching,
  saveLikedPost,
  unsaveLikePost,
}: PostFeedProps) => {
  const skeletonPosts = [];
  for (let i = 0; i < 3; i++) skeletonPosts.push(<SkeletonPostCard key={i} />);

  console.log("PostFeed", { isFetching, posts });

  return (
    <>
      {posts?.map((post: Post) => (
        <PostCard
          post={post}
          key={post.url}
          saveLikedPost={saveLikedPost}
          unsaveLikePost={unsaveLikePost}
        />
      ))}

      {isFetching && (
        <>
          {skeletonPosts}
          <div style={{ paddingTop: 16 }}>
            <Stack distribution="center">
              <Spinner accessibilityLabel="Loading more posts" />
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default PostFeed;
