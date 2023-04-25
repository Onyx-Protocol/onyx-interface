import BigNumber from 'bignumber.js';
import { useField } from 'formik';
import React, { useEffect } from 'react';

import { TokenTextField, TokenTextFieldProps } from '../TokenTextField';

interface FormikTokenTextFieldProps
  extends Omit<TokenTextFieldProps, 'name' | 'onChange' | 'value'> {
  name: string;
  displayableErrorCodes?: string[];
  handleChange?: (newValue: string) => void;
  outAmount?: BigNumber | null;
  decimals?: number;
}

export const FormikTokenTextField = ({
  name,
  displayableErrorCodes = [],
  handleChange,

  outAmount,
  decimals,
  ...rest
}: FormikTokenTextFieldProps) => {
  const [{ value, onBlur }, { error }, { setValue }] = useField(name);

  const onChange = (val: string) => {
    if (handleChange) {
      handleChange(val);
    }

    setValue(val);
  };

  useEffect(() => {
    if (outAmount && decimals) {
      if (outAmount.eq(0)) setValue('');
      else setValue(outAmount.div(10 ** decimals).toString(10));
    }
  }, [outAmount]);

  return (
    <TokenTextField
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      hasError={!!(error && displayableErrorCodes.includes(error))}
      {...rest}
    />
  );
};
