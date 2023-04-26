/** @jsxImportSource @emotion/react */
import { Form, Formik, FormikConfig, FormikHelpers, FormikProps } from 'formik';
import React from 'react';

import useIsMounted from 'hooks/useIsMounted';

import getValidationSchema, { FormValues } from './validationSchema';

export * from './validationSchema';

export interface AmountForm2Props
  extends Omit<FormikConfig<FormValues>, 'onSubmit' | 'initialValues'> {
  onSubmit: (value1: string, value2: string) => Promise<unknown>;
  children: (formProps: FormikProps<FormValues>) => React.ReactNode;
  initialAmount?: FormikConfig<FormValues>['initialValues']['amount1'];
  maxAmount1?: FormikConfig<FormValues>['initialValues']['amount1'];
  maxAmount2?: FormikConfig<FormValues>['initialValues']['amount2'];
  className?: string;
}

export const AmountForm2: React.FC<AmountForm2Props> = ({
  children,
  onSubmit,
  className,
  initialAmount = '',
  maxAmount1,
  maxAmount2,
}) => {
  const isMounted = useIsMounted();

  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    if (values.amount1 && values.amount2) {
      await onSubmit(values.amount1.trim(), values.amount2.trim());
    }

    if (values.amount1 && values.amount2 && isMounted()) {
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={{
        amount1: initialAmount,
        amount2: initialAmount,
      }}
      onSubmit={handleSubmit}
      validationSchema={getValidationSchema(maxAmount1, maxAmount2)}
      isInitialValid={false}
      validateOnMount
      validateOnChange
    >
      {formikProps => <Form className={className}>{children(formikProps)}</Form>}
    </Formik>
  );
};
