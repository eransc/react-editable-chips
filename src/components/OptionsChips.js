import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const OptionsChips = () => {
  const [options, setOptions] = useState("");
  const [numberOfOptions, setNumberOfOptions] = useState(0);

  const classes = useStyles();

  function handleOptionChange(e) {
    setOptions(e.target.value);
  }

  return (
    <div className={classes.root}>
      <Grid item >
        <TextField
          size="small"
          fullWidth={true}
          inputProps={{
            style: { fontSize: 15 },
          }}
          id="outlined-multiline-static"
          multiline
          rows={1}
          placeholder="Search Option"
          variant="outlined"
          value={options}
          onChange={handleOptionChange}
          required
        />
      </Grid>
    </div>
  );
};

export default OptionsChips;
