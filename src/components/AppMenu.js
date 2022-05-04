import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const public_url = process.env.PUBLIC_URL;

const AppMenu = ({user, setUser}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    try {
        await Auth.signOut();
        setUser(null)
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
  
  const mobileAppBarMenuItem = () => {
      return (
          <>
            <MenuItem 
                onClick={() => {
                    handleCloseNavMenu()
                    navigate("/app/dashboard")
                }}>
                 <Typography textAlign="center">Dashboard</Typography>
            </MenuItem>
            <MenuItem 
                onClick={() => {
                    handleCloseNavMenu()
                    navigate("/app/about-us")
                }}>
                 <Typography textAlign="center">About Us</Typography>
            </MenuItem>
          </>
      )
  }

  const deskTopAppBarMenuItem = () => {
    return (
        <>
          <Button
            onClick={() => {
                handleCloseNavMenu()
                navigate("/app/dashboard")
            }}
            sx={{ my: 2, color: 'white', display: 'block' }}>
            Dashboard
         </Button>
          <Button
            onClick={() => {
                handleCloseNavMenu()
                navigate("/app/about-us")
            }}
            sx={{ my: 2, color: 'white', display: 'block' }}>
            About Us
        </Button>
        </>
    )
}

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <img 
            
            src={public_url + '/assets/imgs/logo.jpg'} 
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, width: "100px", height: "100px"}}
            alt='app logo'/> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
              {mobileAppBarMenuItem()}
            </Menu>
          </Box>

          {/* <img 
            src={public_url + '/assets/imgs/logo.jpg'} 
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            alt='app logo'/> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {deskTopAppBarMenuItem()}
          </Box>

          {user ?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>

                <Avatar alt="Remy Sharp" src={public_url + '/assets/imgs/user_profile_img_placeholder.jpeg'} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem  onClick={() => {
                    handleCloseNavMenu()
                    navigate("/app/regular-user-profile/" + user)
                }}>
                    <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem  onClick={() => {
                    handleCloseNavMenu()
                    handleSignOut()
                }}>
                    <Typography textAlign="center">Log out</Typography>
                </MenuItem>
            </Menu>
          </Box> : 
        <Button
            onClick={() => {
                handleCloseNavMenu()
                navigate("/app/auth/sign-in")
            }}
            sx={{ my: 2, color: 'white', display: 'block' }}>
            Sign In
        </Button> }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppMenu;