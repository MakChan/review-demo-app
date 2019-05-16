import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import AuthContext from "../utils/authContext";

import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";

import { Formik, Form, Field } from "formik";

function Login() {
  return (
    <AuthContext.Consumer>
      {({ isAuthenticated, setAuthenticated,setUsername }) =>
        isAuthenticated ? (
          <Redirect to={{ pathname: "/" }} />
        ) : (
          <ApolloConsumer>
            {client => (
              <div className="container-login">
                <div className="card-login border-top-primary">
                  <h1 className="font-weight-bold mb-4">Log In</h1>
                  <Formik
                    initialValues={{
                      username: "",
                      password: ""
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      const user = gql`
                        query {
                          customUser(where: {
                            username: "${values.username}"
                          }) {
                            id
                            username
                            password
                          }
                        }  
                      `;
                      client
                        .query({
                          query: user
                        })
                        .then(data => {
                          console.log(data, data.customUser)
                          if (data.data.customUser.password == values.password) {
                            console.log("loggedIn");
                            setUsername(values.username);
                            setAuthenticated(true);
                          } else {
                            console.log("wrong password")
                          }
                        })
                        .catch(error => console.error(error));

                      //   setSubmitting(false);
                      //   setAuthenticated({ name: "asdsad" });
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className="h4">
                        <div className="form-group">
                          <label htmlFor="email">Username</label>
                          <Field
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            autoComplete="username"
                            name="username"
                            className="form-control"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <Field
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            className="form-control"
                            autoComplete="current-password"
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn-primary btn  btn-lg btn-loading"
                          // disabled={isSubmitting}
                        >
                          {/* {isSubmitting ? (
                            <div className="d-flex align-items-center">
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              />{" "}
                              Logging in...
                            </div>
                          ) : (
                            "Login"
                          )} */}
                          Login
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            )}
          </ApolloConsumer>
        )
      }
    </AuthContext.Consumer>
  );
}

export default Login;
