import React from "react";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  chip: {
    margin: theme.spacing.unit,
    maxHeight: '30px'
  },
  wrapper: {
    flex: 1,
    maxHeight: "66px",
    alignSelf: "center",
    padding: "10px",
  },
}));

const ChipsContainer = ({ limit, chips }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {chips.length === 0 && <span>No Chips - Click to add new items</span>}
      {chips.slice(0, limit).map((x, idx) => (
        <Chip
          label={x}
          key={idx}
          style={{height: '15px'}}
          className={classes.chip}
          color={idx % 2 === 0 ? "primary" : "secondary"}
        />
      ))}
      {chips.length > limit && (
        <Chip
          label={`(${chips.length - limit} more ...)`}
          key={1000}
          style={{height: '15px'}}
          className={classes.chip}
          color={4 % 2 === 0 ? "primary" : "secondary"}
        />
      )}
    </div>
  );
};

export default ChipsContainer;
