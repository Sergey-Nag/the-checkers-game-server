const getListMessage = (arr: any[], callback: (a: any) => string) =>
  arr.map(callback).join('');

export default getListMessage;
