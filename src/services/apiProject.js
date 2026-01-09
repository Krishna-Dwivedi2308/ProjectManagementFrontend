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
  // console.log(projectId);

  try {
    const response = await api.get(`/project/getProjectById/${projectId}`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const deleteProjectById = async projectId => {
  console.log(projectId);
  try {
    const response = await api.get(`/project/deleteProject/${projectId}`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnUpdateProjectById = async (projectId, formdata) => {
  console.log(projectId);
  console.log(formdata);

  try {
    const response = await api.post(`/project/updateProject/${projectId}`, formdata);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnInviteUser = async payload => {
  // console.log(payload);

  const projectId = payload.id;
  const formdata = payload.formdata;
  // console.log(projectId);
  // console.log(formdata);

  try {
    const response = await api.post(`/project/addMemberRequest/${projectId}`, formdata);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnVerifyInvite = async ({ token, email }) => {
  // console.log(payload);

  // const projectId = payload.id;
  // const formdata = payload.formdata;
  // console.log(projectId);
  // console.log(formdata);

  try {
    const response = await api.get(`/project/addMember/?token=${token}&email=${email}`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnGetProjectMembers = async id => {
  // console.log(payload);

  // const projectId = payload.id;
  // const formdata = payload.formdata;
  // console.log(projectId);
  // console.log(formdata);

  try {
    const response = await api.get(`/project/getAllProjectMembers/${id}`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const deleteMemberById = async (projectId, memberId) => {
  // console.log(projectId,memberId);

  try {
    const response = await api.post(`/project/deleteMember/${projectId}/${memberId}`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnChangeMemberRole = async (projectId, formdata) => {
  // console.log(projectId,memberId);

  try {
    const response = await api.post(`/project/updateMemberRole/${projectId}`, formdata);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

// to request for create project that sends formdata as multipart/form-data
