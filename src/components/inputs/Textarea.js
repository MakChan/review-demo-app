import React from "react";
import { FormControl } from "baseui/form-control";
import { StatefulTextarea as Textarea, SIZE } from "baseui/textarea";

const BaseInput = ({ label, field, form, ...props }) => {
  const onChange = event => {
    form.setFieldValue(field.name, event.target.value);
  };
  return (
    <FormControl label={label} error={form.errors[field.name]}>
      <Textarea {...field} {...props} onChange={onChange} size={SIZE.compact} />
    </FormControl>
  );
};

export default BaseInput;
