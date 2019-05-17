import React from "react";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";

const BaseInput = ({ label, field, form, ...props }) => {
  const onChange = event => {
    form.setFieldValue(field.name, event.target.value);
  };
  return (
    <FormControl label={label} error={form.errors[field.name]}>
      <Input {...field} {...props} onChange={onChange} />
    </FormControl>
  );
};

export default BaseInput;
