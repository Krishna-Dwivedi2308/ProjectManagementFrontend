import api from './apiAuth';

export const fnCreateProject = async formData => {
  try {
    const response = await api.post('/project/createProject', formData);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnGetAllProjects = async () => {
  try {
    const response = await api.get('/project/getAllProjects');
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnGetProject = async projectId => {
  console.log(projectId);

  try {
    const response = await api.get(`/project/getProjectById/${projectId}`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
