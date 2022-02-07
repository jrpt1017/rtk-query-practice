import React, { useState, useEffect } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { TextField, Box, Grid, Button } from "@mui/material";
import { useGetPostsQuery, useGetPostByIdQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation } from "./services/posts";
import PostCard from "./components/PostCard";
import Header from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [id, setId] = useState<null | number>(null);
  const [post, setPost] = useState({
    userId: 1,
    title: '',
    body: '',
  });

  const { data, isLoading, isSuccess, isError, error, refetch } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [addPost] = useAddPostMutation()
  const {
    data: i_data,
    isLoading: i_isLoading,
    isSuccess: i_isSuccess,
    isFetching
  } = useGetPostByIdQuery(id);

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
    console.log(id)
    await deletePost(id)
  };

  const handleUpdate = async (id: number) => {
    const req = {
      id,
      ...post
    }
    await updatePost(req)
    resetValue()
  };

  const RenderList = () => {
    return (
      <>
        {i_isSuccess && i_data ? (
          <PostCard
            userId={i_data!.userId}
            id={i_data!.id}
            title={i_data!.title}
            body={i_data!.body}
            handleDelete={() => { return handleDelete(i_data!.id) }}
            handleUpdate={() => { return handleUpdate(i_data!.id) }}
          />
        ) : (
          data?.slice(0, 50).map((post, idx) => {
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
          })
        )}
      </>
    );
  };

  return (
    <div className="App">
      <Header />
      <Grid container style={{ marginTop: 100 }}>
        <Grid item xs={4} style={{ gap: 10, padding: 10 }}>
          <Box display="flex" style={{ position: 'sticky' }}>
            <TextField id="outlined-basic" value={post.title} label="Title" name="title" variant="outlined" fullWidth onChange={(e) => handleInputChange(e)} />
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
