import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { RootState } from "../store";
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';

function Menu() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()
    const userData = useSelector((state: RootState) => state.authenticator)
    const isLoggedin = userData.isAutenticated

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        if (!isLoggedin) {
            navigate('/');
        }
    }, [isLoggedin, navigate]);


    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <Link to='/home' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inicio" />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <Link to='/Reports' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Reports" />
                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {userData.userName}
                    </Typography>
                    <IconButton>
                        <PersonIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    );
}

export default Menu;