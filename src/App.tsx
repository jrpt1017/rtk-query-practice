import "./styles.css";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useGetPostsQuery, useGetPostByIdQuery } from "./services/posts";
import PostCard from "./components/PostCard";
import LoadingScreen from "./components/LoadingScreen";
import { convertLength } from "@mui/material/styles/cssUtils";

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
    console.log(isSuccess, data, id === 0 || id === null);
    if (isSuccess && data && (id === 0 || id === null)) {
      data.slice(0, 5).map((post) => {
        const { userId, id, title, body } = post;
        return <PostCard userId={userId} id={id} title={title} body={body} />;
      });
    }
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
  };

  return (
    <div className="App">
      <TextField
        id="outlined-basic"
        label="Enter id here"
        variant="outlined"
        value={id}
        onChange={(e) => handleOnChange(e)}
      />
      {/* {i_isSuccess && i_data && (
        <PostCard
          userId={i_data!.userId}
          id={i_data!.id}
          title={i_data!.title}
          body={i_data!.body}
        />
      )} */}
      {/* {renderLists()} */}

      {isLoading && <LoadingScreen />}
      {isError && error}
      {isSuccess &&
        data &&
        data.slice(0, 5).map((post) => {
          const { userId, id, title, body } = post;
          return <PostCard userId={userId} id={id} title={title} body={body} />;
        })}
    </div>
  );
}
