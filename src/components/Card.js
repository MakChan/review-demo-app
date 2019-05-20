import React from "react";
import { Card } from "baseui/card";

const StyledCard = props => (
  <Card
    overrides={{
      Root: {
        style: {
          maxWidth: "450px",
          margin: "0 auto",
          top: "50px",
          position: "relative"
        }
      }
    }}
  >
    {props.children}
  </Card>
);

export default StyledCard;
