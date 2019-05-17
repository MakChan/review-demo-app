import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";

import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

const GRAPHCMS_API =
  "https://api-apeast.graphcms.com/v1/cjvpjdbsj4vzg01gh8jf34p7o/master";

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache()
});

const engine = new Styletron();

ReactDOM.render(
  <ApolloProvider client={client}>
    <StyletronProvider value={engine}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StyletronProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
