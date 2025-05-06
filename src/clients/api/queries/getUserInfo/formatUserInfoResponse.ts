import { GetUserInfoResponse } from './types';

const formatSignedMessageResponse = (data: GetUserInfoResponse) => ({
  points: Number(data.points),
});

export default formatSignedMessageResponse;
