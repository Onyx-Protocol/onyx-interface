export const parseRPCErrorMessage = (msg: string) => {
  const open = msg.indexOf('{');
  const close = msg.lastIndexOf('}');
  const jsonMessageParsed = JSON.parse(msg.substring(open, close + 1));
  return jsonMessageParsed;
};

export const formatRPCErrorMessage = (msg: string) => `${msg.charAt(0).toUpperCase()}${msg.slice(1)}.`;
