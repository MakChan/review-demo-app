import React from "react";
import { Spinner } from "baseui/spinner";

export default Loader => (
  <Spinner
    overrides={{
      Svg: {
        style: { margin: "20px auto", display: "block" }
      }
    }}
  />
);
