import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingScreen = () => {
  return (
    <Box sx={{ display: "flex" }} style={{ margin: "auto" }}>
      Data Loading...
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;