export const coverArrToObj = (arr) => {
  return arr.reduce((entities, obj) => ({...entities, [obj.id]: obj}), {});
};
