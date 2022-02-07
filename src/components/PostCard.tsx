import * as React from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from "@mui/material/Card";
import { CardContent, Typography, CardActions, Button, Fab } from "@mui/material";

interface IPostCard {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostCard: React.FC<IPostCard> = (props: IPostCard) => {
  const { userId, id, title, body } = props;

  return (
    <>
      <Card
        style={{
          backgroundColor: "#F5F5F5",
          width: 250,
          height: 250,
          margin: 10,
          position: 'relative'
        }}
      >
        <Fab color="primary" style={{ position: 'absolute', top: -5, right: 35, backgroundColor: '#df860ea8' }} size="small">
          <EditIcon />
        </Fab>
        <Fab color="primary" style={{ position: 'absolute', top: -5, right: -5, backgroundColor: '#df0e0e' }} size="small">
          <DeleteIcon />
        </Fab>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Post # {id}
          </Typography>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            By user {userId}
          </Typography>
          <Typography variant="body2">{body}</Typography>
        </CardContent>
      </Card >
    </>
  );
};

export default PostCard;
