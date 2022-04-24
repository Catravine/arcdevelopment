import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ButtonArrow from './ui/ButtonArrow';

import background from '../assets/background.jpg';
import mobileBackground from '../assets/mobileBackground.jpg';
import phoneIcon from '../assets/phone.svg';
import emailIcon from '../assets/email.svg';
import airplane from '../assets/send.svg';

const useStyles = makeStyles(theme => ({
  background: {
    backgroundImage: `url(${background})`,
    backgroudPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "60em",
    paddingBottom: "10em",
    [theme.breakpoints.down("md")]: {
      backgroundImage: `url(${mobileBackground})`
    }
  },
  estimateButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 80,
    wdith: 205,
    backgroundColor: theme.palette.common.orange,
    fontSize: "1.5rem",
    marginRight: "5em",
    marginLeft: "2em",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      marginRight: 0
    }
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em"
    }
  },
  message: {
    border: `2px solid ${theme.palette.common.blue}`,
    marginTop: "5em",
    borderRadius: 5
  },
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 50,
    height: 45,
    width: 245, 
    fontSize: "1rem",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  }
}))

export default function Contact(props){
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Grid container driection="row">
      <Grid 
        item 
        container 
        direction="column" 
        justify="center" 
        alignItems="center" 
        style={{
          marginBottom: matchesMD ? "5em" : 0,
          marginTop: matchesSM ? "1em" : matchesMD ? "5em" : 0
        }}
        lg={4} 
        xl={3}
      >
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography 
                align={matchesMD ? "center" : undefined} 
                variant="h2" 
                style={{ lineHeight: 1 }}
              >
                Contact Us</Typography>
              <Typography 
                variant="body2" 
                align={matchesMD ? "center" : undefined} 
                style={{ color: theme.palette.common.blue }}
              >
                We're waiting
              </Typography>
            </Grid>
            <Grid item container style={{ marginTop: "2em" }}>
              <Grid item>
                <img src={phoneIcon} alt="phone" style={{ marginRight: "0.5em" }} />
              </Grid>
              <Grid item>
                <Typography 
                  variant="body2" 
                  style={{ color: theme.palette.common.blue, fontSize: "1rem" }}
                >
                  (317) 224-6528
                </Typography>
              </Grid>
            </Grid>
            <Grid item container style={{ marginBottom: "2em" }}>
              <Grid item>
                <img 
                  src={emailIcon} 
                  alt="email" 
                  style={{ marginRight: "0.5em", verticalAlign: "bottom" }} 
                />
              </Grid>
              <Grid item>
                <Typography 
                  variant="body2" 
                  style={{ color: theme.palette.common.blue, fontSize: "1rem" }}
                >
                  caroline@carolinecourtney.com
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="column" style={{ maxWidth: "20em" }}>
              <Grid item style={{marginBottom: "0.5em"}}>
                <TextField 
                  label="Name" 
                  id="name" value={name} 
                  fullWidth
                  onChange={(event) => setName(event.target.value)} 
                />
              </Grid>
              <Grid item style={{marginBottom: "0.5em"}}>
                <TextField 
                  label="Email" 
                  id="email" value={email} 
                  fullWidth
                  onChange={(event) => setEmail(event.target.value)} 
                />
              </Grid>
              <Grid item style={{marginBottom: "0.5em"}}>
                <TextField 
                  label="Phone" 
                  id="phone" value={phone} 
                  fullWidth
                  onChange={(event) => setPhone(event.target.value)} 
                />
              </Grid>
            </Grid>
            <Grid item style={{ maxWidth: "20em" }}>
              <TextField 
                value={message} 
                className={classes.message}
                id="message" 
                InputProps={{ disableUnderline: true }}
                multiline 
                fullWidth
                rows={10} 
                onChange={(event) => setMessage(event.target.value)} 
              />
            </Grid>
            <Grid item container justify="center" style={{ marginTop: "2em" }}>
              <Button className={classes.sendButton} variant="contained">
                Send Message
                <img src={airplane} alt="paper airplaine" style={{ marginLeft: "1em" }} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid 
        item 
        container 
        direction={matchesMD ? "column" : "row"}
        className={classes.background} 
        justify={matchesMD ? "center" : undefined}
        lg={8}
        xl={9}
        alignItems="center"
      >
        <Grid 
          item 
          style={{
            marginLeft: matchesMD ? 0 : "3em", 
            textAlign: matchesMD ? "center" : "inherit"
          }}
        >
          <Grid container direction="column">
            <Grid item>
              <Typography align={matchesMD ? "center" : undefined} variant="h2">
                Simple Software.<br />Revolutionary Results
              </Typography>
              <Typography 
                align={matchesMD ? "center" : undefined} 
                variant="subtitle2" 
                style={{fontSize: "1.5rem"}}
              >
                Take advangage of the 21st Century.
              </Typography>
              <Grid item container justify={matchesMD ? "center" : undefined}>
                <Button 
                  variant="outlined" 
                  className={classes.learnButton} 
                  component={Link} 
                  to="/revolution"
                  onClick={() => props.setValue(2)}
                >
                  <span style={{ marginRight: 5 }}>Learn More</span>
                  <ButtonArrow width={10} height={10} fill={theme.palette.common.blue} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            className={classes.estimateButton}
            component={Link} 
            to="/estimate"
            onClick={() => props.setValue(2)}
          >
            Free Estimate
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}