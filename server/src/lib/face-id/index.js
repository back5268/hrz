import axios from 'axios';

const DOMAIN = 'https://api.ipchello.com';
const API_KEY = 'HlVSHW8bfLhjq6WvctICo1NJWzR740Pa';

export const encodeFormData = (body = {}, media = {}) => {
  try {
    const form = new FormData();
    if (isObject(media)) {
      Object.keys(media).forEach((field) => {
        let data = media[field];
        if (isArray(data)) {
          data.forEach((file) => {
            form.append(field, {
              name: file?.name ?? file?.fileName ?? 'noname.jpg',
              type: file?.type ?? 'image/jpg',
              size: file?.fileSize ?? 0,
              uri: Platform.OS === 'ios' ? file?.uri.replace('file://', '') : file?.uri
            });
          });
        } else if (isObject(data)) {
          form.append(field, {
            name: data?.name ?? data?.fileName ?? 'noname.jpg',
            type: data?.type ?? 'image/jpg',
            size: data?.fileSize ?? 0,
            uri: Platform.OS === 'ios' ? data?.uri.replace('file://', '') : data?.uri
          });
        }
      });
    }
    Object.keys(body).forEach((key) => {
      if (body[key] && typeof body[key] === 'object') {
        form.append(key, JSON.stringify(body[key]));
      } else if (body[key] || body[key] === 0) {
        form.append(key, body[key]);
      }
    });
    return form;
  } catch (error) {}
};

export const registerFace = async (id, name, buffer) => {
  const base64String = buffer.buffer.toString('base64');
  const formData = new FormData();
  formData.append('api_key', API_KEY);
  formData.append('id', "asddasasd");
  formData.append('name', "asddasasd");
  formData.append('img1', base64String);
  try {
    const response = await axios.put(`${DOMAIN}/api/faceid-update-info/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if (response.status === 200 && response?.data?.errorCode === 0) {
      return { status: 1, mess: 'Đăng ký thành công' };
    } else {
      return { status: 0, mess: 'Đăng ký thất bại' };
    }
  } catch (error) {
    console.log(error.response?.data, 22);
    return { status: 0, mess: 'Đăng ký thất bại' };
  }
};

export const checkFace = async (buffer) => {
  const formData = new FormData();
  formData.append('api_key', API_KEY);
  formData.append('image', new Blob([buffer.buffer], { type: buffer.mimetype }), buffer.originalname);
  const response = await axios.post(`${DOMAIN}/api/faceid-search/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  if (response.status == 200) {
    if (response.data?.errorCode === 0) {
      return {
        status: 1,
        data: response?.data?.id
      };
    } else if (response.data?.errorCode === 0 && response.data?.errorMessage === 'unknown 2') {
      return {
        status: 0,
        mess: 'Bạn chưa đăng ký khuôn mặt, vui lòng đăng ký!'
      };
    } else {
      return {
        status: 0,
        mess: 'Bạn chưa chấm được!'
      };
    }
  }
  return {
    status: 0,
    mess: 'Bạn chưa chấm được!'
  };
};
