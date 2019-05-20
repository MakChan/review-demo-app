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
          position: "relative",
          borderColor: "transparent",
          boxShadow: "0 0 40px rgba(0,0,0,.08)" //0 0 40px rgba(204, 0, 255, 0.08)
        }
      }
    }}
  >
    {props.children}
  </Card>
);

export default StyledCard;
