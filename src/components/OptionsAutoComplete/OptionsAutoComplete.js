import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { BehaviorSubject } from "rxjs";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import IconButton from "@material-ui/core/IconButton";

import ChipsContainer from "./ChipsContainer";

const optionsData = [
  "Blues",
  "Classical",
  "Country",
  "Electronic",
  "Folk",
  "Jazz",
  "Pop",
  "Punk",
  "Rock",
];
const subject$ = new BehaviorSubject("");

const OptionsAutoComplete = ({ options, setOptions }) => {
  // rest, opened, focused
  const [controlState, setControlState] = useState("rest");
  const [value, setValue] = useState("");
  // hold available suggestions
  const [suggestions, setSuggestions] = useState(optionsData);

  const node = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    const subscription = subject$.subscribe(
      (value) => {
        const filtered = optionsData.filter((option) =>
          option.toLowerCase().startsWith(value.toLowerCase())
        );

        if (value.length > 1) {
          setControlState("opened");
        }

        setSuggestions(filtered);
        //}
      },
      (error) => {
        console.error(error);
      }
    );
    return () => {
      subscription.unsubscribe();
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // events
  const handleChange = (e) => {
    setValue(e.target.value);
    subject$.next(e.target.value);
  };

  const handleSelect = (idx) => {
    // check if already exists
    const found = options.find((value) => value === suggestions[idx]);
    if (!found) {
      setOptions([...options, suggestions[idx]]);
      setControlState("rest");
    }
  };

  const handleContainerClick = () => {
    setControlState("focused");
  };

  const handleOutsideClick = (e) => {
    if (!node.current.contains(e.target)) {
      // outside click
      setControlState("rest");
    }
  };

  const dropdownClick = (e) => {
    setTimeout(() => {
      setControlState("opened");
    }, 100);
  };

  const addOptionHandler = (e) => {
    // check if already exists
    const suggestionFound = suggestions.find(
      (item) => item.toLowerCase() === value.toLowerCase()
    );
    if (suggestionFound) {
      const optionFound = options.find((val) => val === suggestionFound);
      if (!optionFound) {
        setOptions([...options, suggestionFound]);
        setControlState("rest");
        setValue("");
        setSuggestions(optionsData);
      }
    } else {
      setValue("");
      setSuggestions(optionsData);
      setControlState("focused");
    }
  };

  const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      addOptionHandler();
    }
  };

  // events

  const shouldShowSuggestions = suggestions.length > 0;

  const classes = (theme) => ({
    container: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      border: "1px solid black",
      padding: "5px",
    },
    chip: {
      margin: theme.spacing.unit,
    },
  });

  return (
    <div ref={node} style={classes.container} onClick={handleContainerClick}>
      <div>
        controlState, value : {controlState} {value}
      </div>
      <div style={{ display: "flex" }}>
        {controlState !== "rest" && (
          <TextField
            size="small"
            autoFocus
            fullWidth={true}
            inputProps={{
              style: { fontSize: 15 },
            }}
            id="outlined-multiline-static"
            multiline
            rows={1}
            placeholder="Search Option"
            variant="outlined"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={value}
            placeholder="start typing"
            required
          />
        )}

        {controlState === "rest" ? (
          <ChipsContainer limit={5} chips={options} />
        ) : null}
        <label htmlFor="icon-button-file">
          <IconButton
            onClick={dropdownClick}
            color="primary"
            aria-label="open suggestions"
            component="span"
          >
            <ArrowDropDownIcon />
          </IconButton>
        </label>
      </div>
      {shouldShowSuggestions && controlState === "opened" ? (
        <Paper style={{ height: "110px", overflow: "scroll" }}>
          <MenuItem onClick={addOptionHandler}>Add Option</MenuItem>
          {suggestions.map((suggestion, idx) => (
            <MenuItem
              key={`suggestion-${idx}`}
              onClick={() =>
                setTimeout(() => {
                  handleSelect(idx);
                }, 100)
              }
            >
              {suggestion}
            </MenuItem>
          ))}
        </Paper>
      ) : (
        <Paper style={{ height: "110px", overflow: "auto" }} />
      )}
    </div>
  );
};

export default OptionsAutoComplete;
