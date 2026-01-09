import api from './apiAuth';

export const createSubTask = async (title, projectId, taskId) => {
  try {
    const response = await api.post(`/task/createSubTask/${projectId}/${taskId}`, { title });
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnUpdateSubTask = async (subtaskId, projectId, formdata) => {
  try {
    const response = await api.post(`/task/updateSubTask/${projectId}/${subtaskId}`, formdata);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const fnDeleteSubTask = async (subtaskId, projectId) => {
  try {
    const response = await api.post(`/task/deleteSubTask/${projectId}/${subtaskId}`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
