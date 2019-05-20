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
import Card from "../components/Card";

// import { FileUploader } from "baseui/file-uploader";
// import ReactFilestack from "filestack-react";

import { ADD_REVIEW } from "../utils/mutations";

// const options = {
//   accept: "image/*",
//   maxFiles: 1,
//   storeTo: {
//     location: "s3"
//   }
// };

function AddReview(props) {
  // const handleImageSuccess = vars => {
  //   console.log(vars);
  // };
  // const handleImageError = vars => {
  //   console.log(vars);
  // };
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
                    {/* <ReactFilestack
                      apikey={process.env.REACT_APP_GRAPHCMS_API_URL}
                      options={options}
                      onSuccess={handleImageSuccess}
                      onError={handleImageError}
                      // preload={true}
                      mode="upload"
                      render={({ onPick }) => <FileUploader />}
                      // render={({ onPick }) => (
                      //   <div>
                      //     <strong>Find an avatar</strong>
                      //     <button onClick={onPick}>Pick</button>
                      //   </div>
                      // )}
                    /> */}
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
