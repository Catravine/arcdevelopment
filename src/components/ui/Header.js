import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em"
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em"
    }
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em"
    }
  },
  tabContainer: {
    marginLeft: "auto"
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px"
  },
  logoContainer: {
    padding: "0",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: 0
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawerIcon: {
    height: "50px",
    width: "50px"
  },
  drawerIconContainer: {
    "&:hover": {
      backgroundColor: "transparent"
    },
    marginLeft: "auto"
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white"
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  }

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  }

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  }

  const menuOptions = [
    {name: "Services", link: "/services"},
    {name: "Custom Software Development", link: "/customsoftware"},
    {name: "Mobile App Development", link: "/mobileapps"},
    {name: "Website Development", link: "/websites"}
  ]

  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        if (value !== 0) {
          setValue(0);
        }
        break;
      case "/services":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(0);
        }
        break;
      case "/customsoftware":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        break;
      case "/mobileapps":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(2);
        }
        break;
      case "/websites":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(3);
        }
        break;
      case "/revolution":
        if (value !== 2) {
          setValue(2);
        }
        break;
      case "/about":
        if (value !== 3) {
          setValue(3);
        }
        break;
      case "/contact":
        if (value !== 4) {
          setValue(4);
        }
        break;
      case "/estimate":
        if (value !== 5) {
          setValue(5);
        }
        break;
      default:
        break;
    }
  }, [value]);

  const tabs = (
    <React.Fragment>
      <Tabs 
        value={value} 
        onChange={handleChange} 
        className={classes.tabContainer} 
        indicatorColor="primary"
      >
        <Tab 
          className={classes.tab} 
          component={Link} 
          to="/" 
          label="Home" 
        />
        <Tab 
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup={anchorEl ? "true" : undefined}
          className={classes.tab} 
          component={Link} 
          onMouseOver={event => handleClick(event)}
          to="/services" 
          label="Services" 
        />
        <Tab 
          className={classes.tab} 
          component={Link} 
          to="/revolution" 
          label="The Revolution" 
        />
        <Tab 
          className={classes.tab} 
          component={Link} 
          to="/about" 
          label="About Us" 
        />
        <Tab 
          className={classes.tab} 
          component={Link} 
          to="/contact" 
          label="Contact Us" 
        />
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button} component={Link} to="/estimate">
        Free Estimate
      </Button>
      <Menu 
        id="simple-menu" 
        anchorEl={anchorEl} 
        open={openMenu} 
        onClose={handleClose}
        classes={{paper: classes.menu}}
        MenuListProps={{onMouseLeave: handleClose}}
        elevation={0}
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={i}
            component={Link} 
            to={option.link}
            classes={{root: classes.menuItem}}
            onClick={(event) => {
              handleMenuItemClick(event, i);
              setValue(1);
              handleClose()
            }}
            selected={i === selectedIndex && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer 
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{paper: classes.drawer}}
      >
        <List disablePadding>
          <ListItem onClick={() => setOpenDrawer(false)} divider button component={Link} to="/">
            <ListItemText disableTypography className={classes.drawerItem}>
              Home
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} divider button component={Link} to="/services">
            <ListItemText disableTypography className={classes.drawerItem}>
              Services
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} divider button component={Link} to="/revolution">
            <ListItemText disableTypography className={classes.drawerItem}>
              The Revolution
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} divider button component={Link} to="/about">
            <ListItemText disableTypography className={classes.drawerItem}>
              About Us
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} divider button component={Link} to="/contact">
            <ListItemText disableTypography className={classes.drawerItem}>
              Contact Us
            </ListItemText>
          </ListItem>
          <ListItem className={classes.drawerItemEstimate} onClick={() => setOpenDrawer(false)} divider button component={Link} to="/estimate">
            <ListItemText disableTypography className={classes.drawerItem}>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)} 
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar>
          <Toolbar disableGutters>
            <Button 
              component={Link} to="/" 
              className={classes.logoContainer} 
              onClick={() => setValue(0)}
              disableRipple
            >
              <img alt="company logo" className={classes.logo} src={logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  )
}