export const formatPoint = (point: number, digit?: number) => {
  if (digit) {
    return (+point).toLocaleString('en-US', {
      maximumFractionDigits: digit || 2,
    });
  }

  let [real, imaginary] = point.toString().split('.');
  real = (+real).toLocaleString('en-US');
  imaginary = imaginary ? `.${imaginary}` : '';
  return `${real}${imaginary}`;
};
