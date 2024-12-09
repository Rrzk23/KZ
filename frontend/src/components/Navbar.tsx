import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-scroll';
import { Slide, useScrollTrigger, useMediaQuery, Drawer, List, ListItem, ListItemText, Switch } from '@mui/material';
import { useAppContext } from '../context/Context';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const buttons = ["Home", "Skills", "Projects", "Contact Me"];

interface ElevationScrollProps {
  children: React.ReactElement;
}

function ElevationScroll(props: ElevationScrollProps) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

const Navbar: React.FC = () => {
  const { mode, toggleTheme } = useAppContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Responsive breakpoints
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll>
        <AppBar position="fixed" elevation={4}>
          <Toolbar>
            {isMobile ? (
              <>
                {/* Menu Icon for smaller screens */}
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                {/* Drawer for mobile */}
                <Drawer
                  anchor="left"
                  open={drawerOpen}
                  onClose={toggleDrawer(false)}
                >
                  <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    <List>
                      {buttons.map((button) => (
                        <ListItem button key={button}>
                          <Link
                            to={button.toLowerCase()}
                            smooth={true}
                            duration={500}
                            spy={true}
                            offset={-64}
                          >
                            <ListItemText primary={button} />
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              </>
            ) : (
              // Buttons for larger screens
              buttons.map((button) => (
                <Link
                  key={button}
                  to={button.toLowerCase()}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-64}
                >
                  <Button color="inherit">{button}</Button>
                </Link>
              ))
            )}
            <Switch checked={mode === 'dark'} onChange={toggleTheme} color="primary" />
            <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 2 }}>
              {mode === 'dark' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </Box>
  );
};

export default Navbar;
