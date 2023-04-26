import BigNumber from 'bignumber.js';
import { useField } from 'formik';
import React, { useEffect } from 'react';

import { PrimaryButton, TertiaryButton } from 'components/Button';
import { TokenIconWithSymbol } from 'components/TokenIconWithSymbol';
import { TOKENS, UNISWAP_TOKENS } from 'constants/tokens';

import { TokenTextField, TokenTextFieldProps } from '../TokenTextField';
import { useStyles } from './styles';

interface FormikTokenTextFieldProps
  extends Omit<TokenTextFieldProps, 'name' | 'onChange' | 'value'> {
  name: string;
  displayableErrorCodes?: string[];
  handleChange?: (newValue: string) => void;
  outAmount?: BigNumber | null;
  decimals?: number;
  handleWethSwitch?: () => void;
  wethSwitched?: boolean;
}

export const FormikTokenTextField = ({
  name,
  displayableErrorCodes = [],
  handleChange,
  outAmount,
  decimals,
  handleWethSwitch,
  wethSwitched,
  rightMaxButton,
  ...rest
}: FormikTokenTextFieldProps) => {
  const styles = useStyles();
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
      else setValue(outAmount.div(10 ** decimals).dp(decimals).toString(10));
    }
  }, [outAmount]);

  return (
    <TokenTextField
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      hasError={!!(error && displayableErrorCodes.includes(error))}
      rightAdornment={
        <>
          {handleWethSwitch && (
            <PrimaryButton onClick={() => handleWethSwitch()} small css={styles.switchButton}>
              <TokenIconWithSymbol
                token={wethSwitched ? TOKENS.eth : UNISWAP_TOKENS.weth}
                css={styles.token}
              />
            </PrimaryButton>
          )}

          <TertiaryButton onClick={() => onChange(rightMaxButton?.valueOnClick || '')} small>
            {rightMaxButton?.label}
          </TertiaryButton>
        </>
      }
      {...rest}
    />
  );
};
