import * as React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from "@mui/material/Card";
import { CardContent, Typography, Fab } from "@mui/material";

interface IPostCard {
  userId: number;
  id: number;
  title: string;
  body: string;
  handleDelete: (id: number) => Promise<void>;
  handleUpdate: (id: number) => Promise<void>;
}

const PostCard: React.FC<IPostCard> = (props: IPostCard) => {
  const { userId, id, title, body, handleDelete, handleUpdate } = props;

  return (
    <>
      <Card
        style={{
          backgroundColor: "#F5F5F5",
          width: 250,
          height: 250,
          margin: 10,
          position: 'relative',
          overflow: 'inherit'
        }}
      >
        <Fab color="primary" style={{ position: 'absolute', top: -20, right: 35, backgroundColor: '#df860ea8' }} size="small" onClick={() => handleUpdate(id)}>
          <EditIcon />
        </Fab>
        <Fab color="primary" style={{ position: 'absolute', top: -20, right: -5, backgroundColor: '#df0e0e' }} size="small" onClick={() => handleDelete(id)}>
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
