/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function useValidation(initialState, validators) {
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
    setErrors({});
  };

  const DescriptionChange = (event, editor) => {
    setState(editor.getData());
    let desc;
    if (editor.getData() !== undefined) {
      desc = editor.getData().replaceAll(/"/g, "'");
    }
    setState({ ...state, desc });
    // //console.log((desc);
  };

  const validate = () => {
    let newErrors = {};
    //console.log(("VALIDATION CHECK" + JSON.stringify(state));
    Object.keys(state).forEach((key) => {
      const value = state[key];
      if (validators[key]) {
        const fieldErrors = validators[key].reduce((acc, validator) => {
          const error = validator(value);
          if (error) {
            acc.push(error);
          }
          return acc;
        }, []);

        if (fieldErrors.length > 0) {
          newErrors[key] = fieldErrors;
        }
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return {
    state,
    setState,
    onInputChange,
    DescriptionChange,
    errors,
    validate,
    setErrors,
  };
}

export default useValidation;
