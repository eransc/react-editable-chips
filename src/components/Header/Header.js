import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  const state = useSelector((state) => state);
  const [value, setValue] = React.useState("Welcome");

  return (
    <nav className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Grid justify={"space-around"} container>
            <Grid xs={1} item >
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                }
                alt="App Logo"
              />
              
            </Grid>
            <Grid xs={1} style={{alignSelf: 'center'}} item>
              <Typography variant="h3" component="div">Musix</Typography>
            </Grid>  
            <Grid item xs={5}> 
              <h2 className={classes.title}>{value}</h2>
            </Grid>
            <Grid xs={3} item style={{alignSelf: 'center'}}>
              <Grid >
                <Tabs
                  onChange={(e, v) => {
                    setValue(e.target.textContent);
                  }}
                  value={value}
                  aria-label="Navigation Tabs"
                >
                  <Tab component={Link} to="/" label={"Welcome"}  />
                  {!state.subscription && (
                    <Tab component={Link} to="/subscribe" label={"Subscribe"} />
                  )}
                </Tabs>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Header;
