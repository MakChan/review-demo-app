import React, { useContext, useState } from "react";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import { Button } from "baseui/button";
import { Card, StyledBody } from "baseui/card";
import { Paragraph1 } from "baseui/typography";

import { Formik, Form, Field } from "formik";
import { reviewSchema } from "../utils/validations";

import Input from "../components/inputs/Input";
import Textarea from "../components/inputs/Textarea";

const ADD_REVIEW = gql`
  mutation addReview($title: String!, $body: String!, $username: String!) {
    createReview(
      data: {
        title: $title
        body: $body
        author: { connect: { username: $username } }
      }
    ) {
      id
      title
      body
      author {
        username
      }
    }
  }
`;

function AddReview(props) {
  const handleCompleted = data => {
    console.log(data);
  };

  return (
    <Mutation mutation={ADD_REVIEW} onCompleted={handleCompleted}>
      {(addReview, { loading, error }) => (
        <Formik
          initialValues={{
            title: "",
            body: ""
          }}
          validationSchema={reviewSchema}
          onSubmit={(values, { setSubmitting }) => {
            addReview({
              variables: { ...values, username: props.user.username }
            });
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <>
              <Form>
                <Field
                  label="Title"
                  name="title"
                  component={Input}
                  placeholder="Enter title"
                />

                <Field
                  label="Content"
                  name="body"
                  component={Textarea}
                  placeholder="Enter content"
                />

                {error && (
                  <Paragraph1 color="red">Reviewname exists.</Paragraph1>
                )}
                <Button type="submit" isLoading={loading}>
                  Create
                </Button>
              </Form>
            </>
          )}
        </Formik>
      )}
    </Mutation>
  );
}

export default AddReview;
