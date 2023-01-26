import { OETH_TOKENS } from 'constants/tokens';

/**
 * @deprecated This method is unsafe since it assumes ID passed is always correct
 * see: ONYX-723
 */
export const unsafelyGetOToken = (id: string) => OETH_TOKENS[id as keyof typeof OETH_TOKENS];

export default unsafelyGetOToken;
