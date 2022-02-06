import { useState, useEffect } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { TextField, Box } from "@mui/material";
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

  const renderLists = () => {
    if (i_isSuccess && i_data) {
      return (
        <PostCard
          userId={i_data!.userId}
          id={i_data!.id}
          title={i_data!.title}
          body={i_data!.body}
        />
      );
    }
    if (isSuccess && data && (id === 0 || id === null)) {
      data.slice(0, 5).map((post) => {
        const { userId, id, title, body } = post;
        return (<PostCard userId={userId} id={id} title={title} body={body} />);
      });
    }
  };

  return (
    <div className="App">
      <Header />
      <Box style={{ marginTop: 100 }}>
        {/* {isLoading && <LoadingScreen />}
        {isError && error}
        {isSuccess &&
          data &&
          data.slice(0, 5).map((post) => {
            const { userId, id, title, body } = post;
            return <PostCard userId={userId} id={id} title={title} body={body} />;
          })} */}
        {renderLists()}
      </Box>
      <Fab color="primary" aria-label="add" style={{ float: 'right' }}>
        <AddIcon />
      </Fab>
    </div>
  );
}
