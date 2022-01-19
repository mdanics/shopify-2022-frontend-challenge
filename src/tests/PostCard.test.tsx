import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();
import { Root } from "@shopify/react-testing";
import "@shopify/react-testing/matchers";
import PostCard from "../components/PostCard";
import Post from "../interfaces/Post";
import { mountWithApp } from "./utils/mountWithApp";

describe("<PostCard/>", () => {
  let wrapper: Root<any>;

  beforeEach(() => {
    const mockPost: Post = {
      date: new Date(),
      explanation:
        "What type of cloud is that? This retreating cumulonimbus cloud, more commonly called a thundercloud, is somewhat unusual as it contains the unusual bumpiness of a mammatus cloud on the near end, while simultaneously producing falling rain on the far end. Taken in mid-2013 in southern Alberta, Canada, the cloud is moving to the east, into the distance, as the sun sets in the west, behind the camera. In the featured image, graphic sunset colors cross the sky to give the already photogenic cloud striking orange and pink hues. A darkening blue sky covers the background. Further in the distance, a rising, waxing, gibbous moon is visible on the far right.",
      hdurl: "https://apod.nasa.gov/apod/image/2201/thundercloud_dyer_2000.jpg",
      media_type: "image",
      service_version: "v1",
      title: "A Retreating Thunderstorm at Sunset",
      url: "https://apod.nasa.gov/apod/image/2201/thundercloud_dyer_1592.jpg",
    };

    wrapper = mountWithApp(
      <PostCard
        post={mockPost}
        saveLikedPost={() => {}}
        unsaveLikePost={() => {}}
      />
    );
  });

  it("clicking the like button should like the post", () => {
    expect(wrapper.find("button")).toContainReactText("Like");
    wrapper.find("button")!.trigger("onClick");
    expect(wrapper.find("button")).toContainReactText("Unlike");
  });

  it("clicking the  button should unlike the post", () => {
    // like
    expect(wrapper.find("button")).toContainReactText("Like");
    wrapper.find("button")!.trigger("onClick");

    expect(wrapper.find("button")).toContainReactText("Unlike");

    // unlike
    wrapper.find("button")!.trigger("onClick");
    expect(wrapper.find("button")).toContainReactText("Like");
  });

  it("double clicking the image should like the post", () => {
    const imageContainer = wrapper.findWhere<"div">(
      // @ts-expect-error
      (node) => node.is("div") && node.prop("data-testid") == "image-container"
    );

    imageContainer?.trigger("onDoubleClick");
    expect(wrapper.find("button")).toContainReactText("Unlike");
  });
});
