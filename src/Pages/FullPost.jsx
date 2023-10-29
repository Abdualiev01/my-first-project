import React, { useEffect } from "react";
import { AddComment, CommentsBlock, Post } from "../components";
import { useSelector } from "react-redux";
import Markdown  from "react-markdown";
import { useParams } from "react-router-dom";
import axios from "../axios";



export const FullPost = () => {
  const [data, setData] = React.useState();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.data);

  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(({ data }) => {
        setData(data);  
      })
      .catch((err) => {
        alert("Ошибка при получении статьи");
        console.warn(err);
      });
  }, []);
  return (
    <>
      <Post
        {...data}
        user={data && data.user}
        commentsCount={3}
        isLoading={!data}
        isEditable={data && user._id === data.user._id}
        isFullPost
      >
        {data && <Markdown children={data.text}/>}
      </Post>
      {data && (
        <CommentsBlock
          items={[
            {
              user: {
                fullName: "Alijon Alijon",
                avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
              },
              text: "Это тестовый комментарий 555555",
            },
            {
              user: {
                fullName: "Parviz Parviz",
                avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
              },
              text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
            },
          ]}
          isLoading={false}
        >
          <AddComment />
        </CommentsBlock>
      )}
    </>
  );
};
