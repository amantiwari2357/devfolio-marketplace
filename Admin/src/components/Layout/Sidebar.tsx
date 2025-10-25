import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  Typography,
} from '@mui/material';
import {
  Dashboard,
  People,
  Code,
  School,
  Engineering,
  BusinessCenter,
  Comment,
  Settings,
  ContactMail,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Users', icon: <People />, path: '/users' },
  { text: 'Projects', icon: <Code />, path: '/projects' },
  { text: 'Courses', icon: <School />, path: '/courses' },
  { text: 'Experts', icon: <Engineering />, path: '/experts' },
  { text: 'Services', icon: <BusinessCenter />, path: '/services' },
  { text: 'Enquiries', icon: <ContactMail />, path: '/enquiries' },
  { text: 'Testimonials', icon: <Comment />, path: '/testimonials' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div">
          Devfolio Admin
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
