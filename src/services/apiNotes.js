import api from './apiAuth';

export const fnGetNotes = async projectId => {
  try {
    const response = await api.get(`/note/getNotes/${projectId}`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnCreateNotes = async ({ projectId, content }) => {
  // console.log(content);
  const payload = { content: content };
  // console.log(payload);

  try {
    const response = await api.post(`/note/createNote/${projectId}`, payload);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const fnDeleteNotes = async ({ noteId, id }) => {
  try {
    const response = await api.post(`/note/deleteNote/${id}/${noteId}`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
