import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import RaisedButton from "material-ui/RaisedButton";

const Welcome = () => {
  const history = useHistory();
  const state = useSelector((state) => state);

  const handleClick = () => {
    history.push("/subscribe");
  };

  return (
    <div>
      <h2>
        {state.subscription
          ? `User selected ${state.subscription.selectedOptions} options, user subscribed`
          : "Welcome User , Please subscribe"}
      </h2>
      {!state.subscription &&
      <RaisedButton onClick={handleClick} label="Next Step" />}
    </div>
  );
};

export default Welcome;
