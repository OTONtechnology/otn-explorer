export default (obj) => Object.keys(obj || {})
  .sort((a, b) => Number(a) - Number(b))
  .map((i) => obj[Number(i)]);
