import React, { useContext } from "react";

import AuthContext from "../utils/authContext";

import { Mutation } from "react-apollo";

import { Button } from "baseui/button";
import { Card, StyledBody } from "baseui/card";
import { Paragraph1 } from "baseui/typography";

import { Formik, Form, Field } from "formik";
import { signUpSchema } from "../utils/validations";
import Input from "../components/inputs/Input";

import { SIGNUP } from "../utils/mutations";

function Signup({ history }) {
  const auth = useContext(AuthContext);

  if (auth.user.loggedIn) history.push("/");

  const handleCompleted = data => {
    auth.setAuth(data.createCustomUser.username, "AUTHOR");
  };

  return (
    <Mutation mutation={SIGNUP} onCompleted={handleCompleted}>
      {(createUser, { loading, error }) => (
        <Formik
          initialValues={{
            username: "",
            password: "",
            mame: ""
          }}
          validationSchema={signUpSchema}
          onSubmit={values => {
            createUser({ variables: { ...values } });
          }}
        >
          {() => (
            <Card
              overrides={{
                Root: { style: { width: "328px", margin: "50px auto" } }
              }}
            >
              <StyledBody>
                <h1>Sign up</h1>
                <Form>
                  <Field
                    label="Name"
                    name="name"
                    component={Input}
                    placeholder="Enter name"
                  />

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

                  {error && (
                    <Paragraph1 color="red">Username exists.</Paragraph1>
                  )}
                  <Button type="submit" isLoading={loading}>
                    Sign Up
                  </Button>
                </Form>
              </StyledBody>
            </Card>
          )}
        </Formik>
      )}
    </Mutation>
  );
}

export default Signup;
