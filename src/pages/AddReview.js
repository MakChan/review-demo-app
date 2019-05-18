import React from "react";

import { Mutation } from "react-apollo";

import { Button } from "baseui/button";
import { Card, StyledBody } from "baseui/card";
import { Paragraph1 } from "baseui/typography";
import Check from "baseui/icon/check";

import { Formik, Form, Field } from "formik";
import { reviewSchema } from "../utils/validations";

import Input from "../components/inputs/Input";
import Textarea from "../components/inputs/Textarea";
import { Block } from "baseui/block";

import { ADD_REVIEW } from "../utils/mutations";

function AddReview(props) {
  return (
    <Mutation mutation={ADD_REVIEW}>
      {(addReview, { loading, error, data }) => (
        <Formik
          initialValues={{
            title: "",
            body: ""
          }}
          validationSchema={reviewSchema}
          onSubmit={values => {
            addReview({
              variables: { ...values, username: props.user.username }
            });
          }}
        >
          {() => (
            <Card
              overrides={{
                Root: { style: { width: "500px", margin: "50px auto" } }
              }}
            >
              <StyledBody>
                {data ? (
                  <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="space-evenly"
                  >
                    <Check
                      size={36}
                      overrides={{
                        Svg: {
                          style: ({ $theme }) => ({
                            color: "#fff",
                            backgroundColor: $theme.colors.positive,
                            borderRadius: "100%"
                          })
                        }
                      }}
                    />
                    <span>
                      Your review has been added. The admin will soon review it.
                    </span>
                  </Block>
                ) : (
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
                      <Paragraph1 color="red">
                        Server Error. Try again.
                      </Paragraph1>
                    )}
                    <Button type="submit" isLoading={loading}>
                      Add
                    </Button>
                  </Form>
                )}
              </StyledBody>
            </Card>
          )}
        </Formik>
      )}
    </Mutation>
  );
}

export default AddReview;
