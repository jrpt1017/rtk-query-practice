import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div">
          Redux Toolkit Query POC
        </Typography>
      </Toolbar>
    </AppBar>
  )
};

export default Header;