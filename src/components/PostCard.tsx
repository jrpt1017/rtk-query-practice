import * as React from "react";
import Card from "@mui/material/Card";
import { CardContent, Typography, CardActions, Button } from "@mui/material";

interface IPostCard {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostCard: React.FC<IPostCard> = (props: IPostCard) => {
  const { userId, id, title, body } = props;

  return (
    <Card
      sx={{ minWidth: 275 }}
      style={{
        backgroundColor: "#F5F5F5",
        width: 250,
        height: 250,
        margin: 10,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Post # {id}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          By user {userId}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Update</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card >
  );
};

export default PostCard;
