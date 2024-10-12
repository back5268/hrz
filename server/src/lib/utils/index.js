export * from './validate';

export const removeSpecialCharacter = (string) => {
  if (string) {
    string = string.toLowerCase();
    string = string.replace(/["',]/g, '');
    string = string.replace(/[\/]/g, '-');
    const normalizedString = string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const replacedString = normalizedString.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    const resultString = replacedString.replace(/\s+/g, '-');
    return resultString;
  }
};

export const generateNumber = (length) => {
  let result = '';
  for (var i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
};

export const generateRandomString = (length = 6) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  let hasNumber = false;

  for (let i = 0; i < length; i++) {
    const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
    result += randomChar;
    if (!hasNumber && /\d/.test(randomChar)) {
      hasNumber = true;
    }
  }

  if (!hasNumber) {
    const randomNumber = Math.floor(Math.random() * 10);
    result = result.slice(0, Math.floor(Math.random() * 5)) + randomNumber + result.slice(Math.floor(Math.random() * 5));
  }

  return result;
}

export const replaceFistText = (inputString, prefix = "\\$") => {
  const regex = new RegExp(`${prefix}\\w+\\s?`, 'g');
  return inputString.replace(regex, '');
}

export const ghepGiaTri = ({params, content, format}) => {
  for (let key of Object.keys(params)) {
      if (params[key] === 0 || (params[key] && params[key] !== "undefined")) {
          if (format && typeof params[key] === "number") {
              content = content.replaceAll(key, formatNumber(params[key], true))
              content = content.replaceAll(key.toLocaleUpperCase(), formatNumber(params[key], true))
          } else {
              content = content.replaceAll(key, params[key])
              content = content.replaceAll(key.toLocaleUpperCase(), params[key])
          }
      }
  }
  return content
}

export const formatNumber = (value, noRound) => {
  if (value || value === 0) {
      if (!Number(value)) return 0
      else {
          let a = new Intl.NumberFormat('en-US').format(noRound ? value : Math.round(value))
          return a.replaceAll('.', '|').replaceAll(',', '.').replaceAll('|', ',');
      }
  }
  else return " "
}

export function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, ' ');
  return str;
}

export const checkJson = (str) => {
  try {
      const data = JSON.parse(str)
      return data
  } catch (e) {
      return false
  }
}

export const convertNumberToString = (amount) => {
  const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
  const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
  const thousands = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];

  let words = '';
  let i = 0;

  // Chuyển đổi số thành chuỗi
  let numStr = String(amount);

  // Tính số lượng hàng ngàn trong số
  let numThousands = Math.ceil(numStr.length / 3);

  // Vòng lặp từ hàng ngàn đến hàng đơn vị để chuyển đổi giá trị tiền thành chuỗi
  if (amount > 0) {
      while (i < numThousands) {
          // Lấy 3 chữ số cuối cùng của số và chuyển đổi thành chuỗi
          let part = numStr.slice(-3);
          numStr = numStr.slice(0, -3);
          let partWords = '';

          // Lấy số hàng trăm, chục, đơn vị của 3 chữ số và chuyển đổi thành chuỗi
          let partNum = parseInt(part);
          if (partNum !== 0) {
              let hundredsDigit = Math.floor(partNum / 100);
              let tensDigit = Math.floor((partNum % 100) / 10);
              let onesDigit = partNum % 10;
              if (hundredsDigit !== 0) {
                  partWords += ones[hundredsDigit] + ' trăm ';
              }
              if (tensDigit === 0 && onesDigit !== 0) {
                  partWords += ones[onesDigit];
              } else if (tensDigit === 1 && onesDigit !== 0) {
                  partWords += 'mười ' + ones[onesDigit];
              } else if (tensDigit === 1 && onesDigit === 0) {
                  partWords += 'mười ';
              } else if (tensDigit > 1 && onesDigit === 0) {
                  partWords += tens[tensDigit];
              } else if (tensDigit > 1 && onesDigit !== 0) {
                  partWords += tens[tensDigit] + ' ' + ones[onesDigit];
              } else if (hundredsDigit === 0 && tensDigit === 0 && onesDigit === 0 && i === 0) {
                  partWords += 'không';
              }
          }
          if (partWords !== '') {
              partWords += ' ' + thousands[i];
          }
          words = partWords + ' ' + words;
          i++;
      }
      words = words.charAt(0).toUpperCase() + words.slice(1);
      words = words.trim();
  }
  if (amount === 0) {
      words = 'Không'
  }
  if (amount < 0) {
      words = convertMoneyToString(Math.abs(amount));
      words = 'Âm ' + words;
  }
  return words + " đồng.";
}
