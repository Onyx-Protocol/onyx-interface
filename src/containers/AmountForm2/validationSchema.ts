import BigNumber from 'bignumber.js';
import * as yup from 'yup';

export type FormValues = yup.InferType<ReturnType<typeof getValidationSchema>>;

export enum ErrorCode {
  NOT_POSITIVE = 'NOT_POSITIVE', // value must be positive
  HIGHER_THAN_MAX = 'HIGHER_THAN_MAX', // value must be lower or equal to max
}

const getValidationSchema = (maxAmount1?: string, maxAmount2?: string) =>
  yup.object({
    amount1: yup
      .string()
      .required()
      .test('isPositive', ErrorCode.NOT_POSITIVE, value => !!value && +value > 0)
      .test(
        'isHigherThanMax',
        ErrorCode.HIGHER_THAN_MAX,
        value => !value || !maxAmount1 || new BigNumber(value).lte(new BigNumber(maxAmount1)),
      ),
    amount2: yup
      .string()
      .required()
      .test('isPositive', ErrorCode.NOT_POSITIVE, value => !!value && +value > 0)
      .test(
        'isHigherThanMax',
        ErrorCode.HIGHER_THAN_MAX,
        value => !value || !maxAmount2 || new BigNumber(value).lte(new BigNumber(maxAmount2)),
      ),
  });

export default getValidationSchema;
