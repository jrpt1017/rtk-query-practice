import React, { useState } from "react";
import { TextField, Box, Grid, Button } from "@mui/material";
import { useGetPostsQuery, useGetPostByIdQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation } from "./services/posts";
import PostCard from "./components/PostCard";
import Header from "./components/Header";

export default function App() {
  const [id, setId] = useState<null | number>(null);
  const [post, setPost] = useState({
    userId: 1,
    title: '',
    body: '',
  });

  const { data } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [addPost] = useAddPostMutation();

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setId(Number(event.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const resetValue = () => {
    setPost({
      userId: 1,
      title: '',
      body: '',
    });
  }

  const handleOnClick = async () => {
    await addPost(post);
  };

  const handleDelete = async (id: number) => {
    await deletePost(id)
  };

  const handleUpdate = async (id: number) => {
    await updatePost({ id, ...post })
    resetValue()
  };

  const RenderList = () => {
    return (
      <>
        {data?.slice(0, 50).map((post, idx) => {
          const { userId, id, title, body } = post;
          return (
            <PostCard
              userId={userId}
              key={idx}
              id={id}
              title={title}
              body={body}
              handleDelete={() => { return handleDelete(id) }}
              handleUpdate={() => { return handleUpdate(id) }}
            />
          );
        })}
      </>
    );
  };

  return (
    <div className="App">
      <Header />
      <Grid container style={{ marginTop: 100 }}>
        <Grid item xs={4} style={{ gap: 10, padding: 10 }}>
          <Box display="flex" flexWrap="wrap" style={{ position: 'sticky' }}>
            <TextField style={{ marginBottom: 10 }} id="outlined-basic" value={post.title} label="Title" name="title" variant="outlined" fullWidth onChange={(e) => handleInputChange(e)} />
            <TextField id="outlined-basic" value={post.body} label="Body" name="body" variant="outlined" fullWidth onChange={(e) => handleInputChange(e)} />
          </Box>
          <Button variant="contained" fullWidth style={{ padding: 10, marginTop: 10 }} onClick={handleOnClick} disabled={(post.title === '') || (post.body === '')}>Submit</Button>
        </Grid>
        <Grid item xs={8}>
          <Box display="flex" flexWrap="wrap">
            <RenderList />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
