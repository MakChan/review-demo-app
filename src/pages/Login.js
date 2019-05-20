import React, { useContext, useState } from "react";

import AuthContext from "../utils/authContext";

import { ApolloConsumer } from "react-apollo";

import { Button } from "baseui/button";
import { StyledBody } from "baseui/card";
import { Paragraph1 } from "baseui/typography";

import { Formik, Form, Field } from "formik";
import { loginSchema } from "../utils/validations";

import Input from "../components/inputs/Input";
import Card from "../components/Card";

import { GET_USER } from "../utils/queries";

function Login({ history }) {
  const auth = useContext(AuthContext);
  const [hasError, setHasError] = useState(false);

  if (auth.user.loggedIn) history.push("/");
  return (
    <ApolloConsumer>
      {client => (
        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setHasError(false);

            client
              .query({
                query: GET_USER,
                variables: { username: values.username },
                fetchPolicy: "no-cache"
              })
              .then(data => {
                if (data.data.customUser.password == values.password)
                  auth.setAuth(values.username, data.data.customUser.type);
                else setHasError(true);
                setSubmitting(false);
              })
              .catch(error => {
                console.error(error);
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Card>
              <StyledBody>
                <h1>Log In</h1>
                <Form>
                  <Field
                    label="Username"
                    name="username"
                    component={Input}
                    placeholder="Enter username"
                  />

                  <Field
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    component={Input}
                  />

                  {hasError && (
                    <Paragraph1 color="red">
                      Wrong username/password. Try again.
                    </Paragraph1>
                  )}

                  <Button type="submit" isLoading={isSubmitting}>
                    Login
                  </Button>
                </Form>
              </StyledBody>
            </Card>
          )}
        </Formik>
      )}
    </ApolloConsumer>
  );
}

export default Login;
