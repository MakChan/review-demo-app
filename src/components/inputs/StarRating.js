import React from "react";
import { FormControl } from "baseui/form-control";
import { StarRating } from "baseui/rating";

const BaseInput = ({ label, field, form, ...props }) => {
  const onChange = ({ value }) => {
    form.setFieldValue(field.name, value);
  };
  return (
    <FormControl label={label}>
      <StarRating
        value={field.value}
        {...field}
        {...props}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default BaseInput;
