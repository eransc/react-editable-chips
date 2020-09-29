import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

import OptionsAutoComplete from "../OptionsAutoComplete/OptionsAutoComplete";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";

import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import Frame from "react-frame-component";

export default function AnimatedModal() {
  const history = useHistory();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  // actual chosen ones
  const [options, setOptions] = useState([]);

  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    grow: {
      animation: "createBox 1s",
      width: `${width / 2}px`,
      height: `${height / 2}px`,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),

      animation: "createBox 1s",
      width: `${width / 2}px`,
      height: `${height / 2}px`,
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // events
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (options.length > 0) {
      dispatch({
        type: "options/setSelectedOptions",
        payload: options.length,
      });
      history.push("/");
    }
  };

  useEffect(() => {
    // calc width and height
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "12px" }}>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Subscribe
      </Button>
      {open ? (
        <Frame frameBorder={0} className={classes.grow}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <form onSubmit={handleSubmit}>
                  <Grid
                    container
                    justify="space-between"
                    direction="column"
                    spacing={24}
                  >
                    <Grid item xs={12}>
                      <OptionsAutoComplete
                        options={options}
                        setOptions={setOptions}
                      />
                    </Grid>
                    <Grid item space={4}>
                      <br></br>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Fade>
          </Modal>
        </Frame>
      ) : null}
    </div>
  );
}
