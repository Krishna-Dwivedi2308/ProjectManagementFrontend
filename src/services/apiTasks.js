import api from './apiAuth';

export const fnCreateTask = async (formData, projectId) => {
  try {
    console.log(formData);
    console.log(projectId);
    console.log(typeof projectId);

    const response = await api.post(`/task/createTask/${projectId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // const response = await api.post(`/task/createTask/${projectId}`, formData);

    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const fnGetAllTasks = async projectId => {
  try {
    const response = await api.get(`/task/getAllProjectTasks/${projectId}`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnGetMyTasks = async () => {
  try {
    const response = await api.get(`/task/getMyTasks`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnGetTaskById = async (taskId, projectId) => {
  try {
    const response = await api.get(`/task/getTaskbyId/${projectId}/${taskId}`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnDeleteTaskById = async (taskId, projectId) => {
  try {
    const response = await api.post(`/task/deleteTask/${projectId}/${taskId}`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnUpdateTask = async (formdata, projectId, taskId) => {
  console.log(formdata);

  try {
    const response = await api.post(`/task/updateTask/${projectId}/${taskId}`, formdata);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
