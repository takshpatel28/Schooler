import axios from 'axios';

const API_URL = 'http://localhost:5001/api/manage-year';

// Get all active years
export const getYears = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching years:', error);
    throw error;
  }
};

// Get all years including deleted ones
export const getAllYears = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all years:', error);
    throw error;
  }
};

// Create a new year
export const createYear = async (yearData) => {
  try {
    const response = await axios.post(API_URL, yearData);
    return response.data;
  } catch (error) {
    console.error('Error creating year:', error);
    throw error;
  }
};

// Update an existing year
export const updateYear = async (id, yearData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, yearData);
    return response.data;
  } catch (error) {
    console.error('Error updating year:', error);
    throw error;
  }
};

// Toggle year active status
export const toggleYearStatus = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/toggle`);
    return response.data;
  } catch (error) {
    console.error('Error toggling year status:', error);
    throw error;
  }
};

// Upload Excel file
export const uploadExcel = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading Excel:', error);
    throw error;
  }
};

export default {
  getYears,
  getAllYears,
  createYear,
  updateYear,
  toggleYearStatus,
  uploadExcel
};