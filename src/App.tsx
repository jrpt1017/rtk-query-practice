import { useState, useEffect } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { TextField, Box, Grid, Button } from "@mui/material";
import { useGetPostsQuery, useGetPostByIdQuery } from "./services/posts";
import PostCard from "./components/PostCard";
import Header from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [id, setId] = useState<null | number>(null);

  const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery();
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

  const RenderList = () => {
    return (
      <>
        {i_isSuccess && i_data ? (
          <PostCard
            userId={i_data!.userId}
            id={i_data!.id}
            title={i_data!.title}
            body={i_data!.body}
          />
        ) : (
          data?.slice(0, 5).map((post, idx) => {
            const { userId, id, title, body } = post;
            return (
              <PostCard
                userId={userId}
                key={idx}
                id={id}
                title={title}
                body={body}
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
          <Box display="flex">
            <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth />
            <TextField id="outlined-basic" label="Body" variant="outlined" fullWidth />
          </Box>
          <Button variant="contained" fullWidth style={{ padding: 10, marginTop: 10 }}>Submit</Button>
        </Grid>
        <Grid item xs={8}>
          <RenderList />
        </Grid>
      </Grid>
    </div>
  );
}
