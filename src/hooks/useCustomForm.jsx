import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const useCustomForm = (fields, watchFields, validate) => {
  const [fieldsState, setFieldsState] = useState(fields);
  const [isValid, setIsValid] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [previousMergedObject, setPreviousMergedObject] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    clearErrors,
    setValue,
    reset,
  } = useForm({
    defaultValues:
      fieldsState &&
      fieldsState.reduce((acc, field) => {
        acc[field.name] = field.value || "";
        return acc;
      }, {}),
  });

  useEffect(() => {
    setFieldsState(fields);
  }, [fields]);

  const watchValues = watchFields && watch(watchFields);

  const mergedObject = {};
  watchFields?.forEach((field, index) => {
    mergedObject[field] = watchValues[index];
  });

  const memoizedValidateFunction = useCallback(() => {
    if (typeof validate === "function") {
      validate(mergedObject, {
        errors,
        setError,
        clearErrors,
        setValue,
        reset,
        register,
      });
    }
  }, [
    validate,
    mergedObject,
    errors,
    setError,
    clearErrors,
    setValue,
    reset,
    register,
  ]);

  useEffect(() => {
    if (
      watchValues &&
      JSON.stringify(previousMergedObject) !== JSON.stringify(watchValues)
    ) {
      memoizedValidateFunction();
      setPreviousMergedObject(watchValues);
    }
  }, [watchValues, memoizedValidateFunction, previousMergedObject]);

  useEffect(() => {
    setIsValid(Object.keys(errors).length === 0);
  }, [errors]);

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isValid,
    selectedOptions,
    setSelectedOptions,
    setFieldsState,
  };
};

export default useCustomForm;
