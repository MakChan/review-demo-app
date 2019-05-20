import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_GRAPHCMS_API_URL }),
  cache: new InMemoryCache()
});

const engine = new Styletron();

ReactDOM.render(
  <ApolloProvider client={client}>
    <StyletronProvider value={engine}>
      <App />
    </StyletronProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.register();
