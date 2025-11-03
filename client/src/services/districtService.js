import axios from 'axios';

const API_URL = 'http://localhost:5001/api/districts';

// Get all districts
export const getAllDistricts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

// Get districts by state
export const getDistrictsByState = async (stateId) => {
  try {
    const response = await axios.get(`${API_URL}/state/${stateId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching districts for state ${stateId}:`, error);
    throw error;
  }
};

// Get a single district
export const getDistrict = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching district with id ${id}:`, error);
    throw error;
  }
};

// Create a new district
export const createDistrict = async (districtData) => {
  try {
    const response = await axios.post(API_URL, districtData);
    return response.data;
  } catch (error) {
    console.error('Error creating district:', error);
    throw error;
  }
};

// Update a district
export const updateDistrict = async (id, districtData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, districtData);
    return response.data;
  } catch (error) {
    console.error(`Error updating district with id ${id}:`, error);
    throw error;
  }
};

// Delete a district (soft delete)
export const deleteDistrict = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting district with id ${id}:`, error);
    throw error;
  }
};

// Upload Excel file
export const uploadExcelFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading Excel file:', error);
    throw error;
  }
};