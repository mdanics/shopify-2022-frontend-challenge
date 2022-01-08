import { FooterHelp, Layout, Link, Page } from "@shopify/polaris";
import Post from "../interfaces/Post";
import PostCard from "../components/PostCard";
import ModeSelector from "../components/ModeSelector";
import usePosts from "../hooks/usePosts";

const Posts = () => {
  const { posts, error, isLoading } = usePosts();

  if (isLoading) return <div> loading -todo use skeletons </div>;
  console.log({ posts });

  return (
    <Page
      title="Spacestagram"
      subtitle="Utilizing NASA's Astronomy Photo of the Day to provide you with a beautiful feed of images"
      divider
    >
      <Layout>
        <Layout.Section secondary>
          <ModeSelector />
        </Layout.Section>
        <Layout.Section>
          {posts?.map((post: Post) => (
            <PostCard post={post} />
          ))}
        </Layout.Section>

        <Layout.Section>
          <FooterHelp>Wow you reached the bottom!</FooterHelp>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Posts;
