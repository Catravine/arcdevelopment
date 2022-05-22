import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

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
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225
    }
  }
}))

export default function Contact(props){
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [emailHelper, setEmailHelper] = useState('');

  const [phone, setPhone] = useState('');
  const [phoneHelper, setPhoneHelper] = useState('');

  const [message, setMessage] = useState('');

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({open: false, message: '', backgroundColor: ''})

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  const sendMailUrl = 'https://us-central1-arcdevelopment-3117d.cloudfunctions.net/sendMail'
  const successColor = "#4bb543";
  const failureColor = "#ff3232";

  const onChange = event => {
    let valid;
    switch (event.target.id) {
      case 'email': 
        setEmail(event.target.value);
        valid = emailRegex.test(event.target.value);
        if (valid) {
          setEmailHelper("")
        } else {
          setEmailHelper("Invalid email")
        }
        break;
      case 'phone':
        setPhone(event.target.value)
        valid = phoneRegex.test(event.target.value);
        if (valid) {
          setPhoneHelper("");
        } else {
          setPhoneHelper("Invalid phone");
        }
        break;
      default:
        break;
    }
  }

  const onConfirm = () => {
    setLoading(true);
    axios.get(sendMailUrl, {params: {
      name: name,
      email: email,
      phone: phone,
      message: message
    }})
      .then(res => {
        setLoading(false);
        setOpen(false);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setAlert({ 
          open: true, 
          message: "Message sent successfully!", 
          backgroundColor: successColor 
        })
      })
      .catch(err => {
        setLoading(false);
        setAlert({
          open: true,
          message: "Something went wrong, please try again!",
          backgroundColor: failureColor
        })
      })
  };

  const buttonContents = (
    <React.Fragment>
      Send Message
      <img 
        src={airplane} 
        alt="paper airplaine" 
        style={{ marginLeft: "1em" }} 
      />
    </React.Fragment>
  )

  return (
    <Grid container driection="row">
      <Grid 
        item 
        container 
        direction="column" 
        justifyContent="center" 
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
                  <a 
                    style={{textDecoration: "none", color: "inherit"}} 
                    href="tel:3172246528"
                  >(317) 224-6528</a>
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
                  <a 
                    style={{textDecoration: "none", color: "inherit"}} 
                    href="mailto:caroline@carolinecourtney.com"
                  >
                    caroline@carolinecourtney.com
                  </a>
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="column" style={{ width: "20em" }}>
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
                  error={emailHelper.length != 0}
                  helperText={emailHelper}
                  id="email" value={email} 
                  fullWidth
                  onChange={onChange} 
                />
              </Grid>
              <Grid item style={{marginBottom: "0.5em"}}>
                <TextField 
                  label="Phone" 
                  error={phoneHelper.length != 0}
                  helperText={phoneHelper}
                  id="phone" value={phone} 
                  fullWidth
                  onChange={onChange} 
                />
              </Grid>
            </Grid>
            <Grid item style={{ width: "20em" }}>
              <TextField 
                value={message} 
                className={classes.message}
                id="message" 
                InputProps={{ disableUnderline: true }}
                multiline 
                placeholder="Tell us more about your project" 
                fullWidth
                rows={10} 
                onChange={(event) => setMessage(event.target.value)} 
              />
            </Grid>
            <Grid item container justifyContent="center" style={{ marginTop: "2em" }}>
              <Button 
                disabled={
                  name.length === 0 || 
                  message.length === 0 || 
                  phoneHelper.length !== 0 || 
                  emailHelper.length !== 0}
                className={classes.sendButton} 
                variant="contained"
                onClick={() => setOpen(true)}
              >
                {buttonContents}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog 
        style={{zIndex: 1302}}
        open={open} 
        onClose={() => setOpen(false)} 
        fullScreen={matchesSM}
        PaperProps={{style: { 
          paddingTop: matchesXS ? "1em" : "5em", 
          paddingBottom: matchesXS ? "1em" : "5em", 
          paddingLeft: matchesXS ? 0 : matchesSM ? "5em" : matchesMD ? "15em" : "25em", 
          paddingRight: matchesXS ? 0 : matchesSM ? "5em" : matchesMD ? "15em" : "25em"
        }}}
      >
        <DialogContent>
          <Grid container direction="column">
            <Grid item>
              <Typography 
                align="center" 
                variant="h4" 
                gutterBottom
              >
                Confirm Message
              </Typography>
            </Grid>
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
                error={emailHelper.length != 0}
                helperText={emailHelper}
                id="email" value={email} 
                fullWidth
                onChange={onChange} 
              />
            </Grid>
            <Grid item style={{marginBottom: "0.5em"}}>
              <TextField 
                label="Phone" 
                error={phoneHelper.length != 0}
                helperText={phoneHelper}
                id="phone" value={phone} 
                fullWidth
                onChange={onChange} 
              />
            </Grid>
            <Grid item style={{ width: matchesSM ? "100%" : "20em" }}>
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
          </Grid>
          <Grid 
            item 
            container 
            style={{marginTop: "2em"}} 
            alignItems="center"
            direction={matchesSM ? "column" : "row"}
          >
            <Grid item>
              <Button 
                style={{fontWeight: 300}} 
                color="primary" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button 
                disabled={
                  name.length === 0 || 
                  message.length === 0 || 
                  phoneHelper.length !== 0 || 
                  emailHelper.length !== 0}
                className={classes.sendButton} 
                variant="contained"
                onClick={onConfirm}
              >
                {loading ? <CircularProgress size={30} /> : buttonContents}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Snackbar 
        open={alert.open} 
        message={alert.message} 
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
        onClose={() => setAlert({...alert, open: false})}
        autoHideDuration={4000}
      />

      <Grid 
        item 
        container 
        direction={matchesMD ? "column" : "row"}
        className={classes.background} 
        justifyContent={matchesMD ? "center" : undefined}
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
              <Grid item container justifyContent={matchesMD ? "center" : undefined}>
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