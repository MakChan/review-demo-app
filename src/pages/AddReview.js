import React from "react";

import { Mutation } from "react-apollo";

import { Button } from "baseui/button";
import { StyledBody } from "baseui/card";
import { Paragraph1 } from "baseui/typography";
import { Block } from "baseui/block";
import Check from "baseui/icon/check";

import { Formik, Form, Field } from "formik";
import { reviewSchema } from "../utils/validations";

import Input from "../components/inputs/Input";
import Textarea from "../components/inputs/Textarea";
import StarRating from "../components/inputs/StarRating";

import Card from "../components/Card";

import { ADD_REVIEW } from "../utils/mutations";

function AddReview(props) {
  return (
    <Mutation mutation={ADD_REVIEW}>
      {(addReview, { loading, error, data }) => (
        <Formik
          initialValues={{
            title: "",
            body: "",
            rating: ""
          }}
          validationSchema={reviewSchema}
          onSubmit={values => {
            addReview({
              variables: { ...values, username: props.user.username }
            });
          }}
        >
          {({ isValid, errors }) => (
            <Card>
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
                    <span style={{ paddingLeft: 10 }}>
                      Your review has been added. The admin will soon review it.
                    </span>
                  </Block>
                ) : (
                  <Form>
                    <Field label="Rate" name="rating" component={StarRating} />

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
                    <Button
                      type="submit"
                      isLoading={loading}
                      disabled={!isValid}
                    >
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
