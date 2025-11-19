import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // send cookies on every request
});

export default api;

export const fnlogin = async formData => {
  try {
    const response = await api.post('/user/login', formData, { withCredentials: true });
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fngetCurrentUser = async () => {
  try {
    const response = await api.get('/user/getCurrentUser', { withCredentials: true });
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const fnRegisterUser = async formData => {
  try {
    const data = new FormData();
    data.append('fullname', formData.name);
    data.append('username', formData.username); // add username if required
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('avatar', formData.profile_pic); // file

    const response = await api.post('/user/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);

    if (error.response) {
      throw error.response.data; // backend error message
    }
    if (error.request) {
      throw { message: 'No response from server' };
    }
    throw { message: error.message || 'Unexpected error' };
  }
};

export const fnVerifyEmail = async ({ token, email }) => {
  console.log(token, email);

  try {
    const response = await api.get(`/user/verify-email?token=${token}&email=${email}`);
    // console.log(response);

    return response.data; // return only data
  } catch (error) {
    // console.log(error.response.data.message);
    throw error.response?.data?.message || { message: 'Network error' };
  }
};

export const fnLogout = async () => {
  try {
    const response = await api.post('/user/logout', {}, { withCredentials: true });
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const fnResendEmail = async formData => {
  try {
    const response = await api.post('/user/resend-verification-email', formData);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnPasswordReset = async formData => {
  try {
    const response = await api.post('/user/forgotPasswordRequest', formData);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnResetPassword = async formData => {
  try {
    console.log(formData);

    const response = await api.post('/user/reset-password', formData);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnChangePassword = async formData => {
  try {
    console.log(formData);
    const payload = { oldPassword: formData.oldPassword, newPassword: formData.newPassword };
    const response = await api.post('/user/changeCurrentPassword', payload);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
