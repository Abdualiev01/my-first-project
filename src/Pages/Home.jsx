import { Grid, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { CommentsBlock, Post, TagsBlock } from "../components";

export const Home = () => {
  const { posts, postStatus, tags, tagStatus } = useSelector(
    (state) => state.posts
  );
  const user = useSelector((state) => state.auth.data);

  const dispatch = useDispatch();

  const postsLoading = postStatus === "loading";
  const tagsLoading = tagStatus === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  },[]);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basics-tab">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          {(postsLoading ? [...Array(5)] : posts).map((obj, index) => (
            <Post
              key={index}
              {...obj}
              user={obj && obj.user}
              commentsCount={3}
              isLoading={postsLoading}
              isEditable={obj && user ? user._id === obj.user._id : false}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags} isLoading={tagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Orash Orash",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
              },
              {
                user: {
                  fullName: "Valijon Valijon",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
