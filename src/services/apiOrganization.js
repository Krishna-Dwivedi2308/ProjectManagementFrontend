import api from './apiAuth';

export const fnCreateOrganization = async formData => {
  try {
    const response = await api.post('/organization/create', formData);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const getAllOrganizations = async () => {
  try {
    const response = await api.get('/organization/getAllOrganizations');
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};

export const getOrganizationById = async organizationId => {
  try {
    const response = await api.get(`/organization/getOrganizationById/${organizationId}`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const deleteOrganizationById = async organizationId => {
  try {
    const response = await api.post(`/organization/deleteOrganization/${organizationId}`);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const createOrganization = async formData => {
  try {
    const response = await api.post(`/organization/createOrganization`, formData);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
export const updateOrganization = async formData => {
  try {
    const response = await api.post(`/organization/updateOrganization`, formData);
    return response.data; // return only data
  } catch (error) {
    throw error.response?.data || { message: 'Network error' };
  }
};
