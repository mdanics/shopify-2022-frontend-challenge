import { useCallback, useState } from "react";
import {
  Button,
  FooterHelp,
  Layout,
  Link,
  Page,
  Spinner,
  Stack,
} from "@shopify/polaris";
import Post from "../interfaces/Post";
import PostCard from "../components/PostCard";
import ModeSelector, { ViewModes } from "../components/ModeSelector";
import usePosts from "../hooks/usePosts";

const Posts = () => {
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.ENDLESS);

  const setMode = useCallback((mode: ViewModes) => setViewMode(mode), []);

  const { posts, error, isLoading, isFetching } = usePosts();

  return (
    <Page
      title="Spacestagram"
      subtitle="Utilizing NASA's Astronomy Photo of the Day to provide you with a beautiful feed of images"
      divider
    >
      <Layout>
        <Layout.Section secondary>
          <ModeSelector viewMode={viewMode} setMode={setMode} />
        </Layout.Section>
        <Layout.Section>
          {isLoading && <h1> show skeletons</h1>}
          {posts?.map((post: Post) => (
            <PostCard post={post} key={post.url} />
          ))}
          {isFetching && (
            <div style={{ paddingTop: 16 }}>
              <Stack distribution="center">
                <Spinner accessibilityLabel="Loading more posts" />
              </Stack>
            </div>
          )}
        </Layout.Section>

        <Layout.Section>
          {/* <Button onClick={() => setSize(size + 1)}> More </Button> */}
          <FooterHelp>Wow you reached the bottom!</FooterHelp>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Posts;
