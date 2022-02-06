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
    marginBottom: "3em"
  },
  logo: {
    height: "8em"
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
  }
}));

export default function Header(props) {
  const classes = useStyles()
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e, value) => {
    setValue(value)
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  }

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
  }

  useEffect(() => {
    const tabUrlOrder = ["/", "/services", "/revolution", "/about", "/contact", "/estimate"]
    for (var i = 0; i < tabUrlOrder.length; i++) {
      if (window.location.pathname === tabUrlOrder[i] && value !== i) {
        setValue(i)
      }
    }
  }, [value])

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
              open={open} 
              onClose={handleClose}
              MenuListProps={{onMouseLeave: handleClose}}
            >
              <MenuItem onClick={handleClose}>Custom Software Development</MenuItem>
              <MenuItem onClick={handleClose}>Mobile App Development</MenuItem>
              <MenuItem onClick={handleClose}>Website Development</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  )
}