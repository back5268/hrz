export const replaceFistText = (inputString = '', prefix = '\\$') => {
  const regex = new RegExp(`${prefix}\\w+\\s?`, 'g');
  return inputString.replace(regex, '');
};
export const convertParams = (params, html) => {
  for (const key of Object.keys(params)) {
    html = html.replaceAll(key, params[key]);
    html = html.replaceAll(key.toLocaleUpperCase(), params[key]);
  }
  return replaceFistText(html);
};
