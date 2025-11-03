import axios from 'axios';

const API_URL = 'http://localhost:5001/api/manage-exam-center';

// Get all exam centers
export const getAllExamCenters = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching exam centers:', error);
    throw error;
  }
};

// Get a single exam center
export const getExamCenter = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exam center with id ${id}:`, error);
    throw error;
  }
};

// Create a new exam center
export const createExamCenter = async (examCenterData) => {
  try {
    const response = await axios.post(API_URL, examCenterData);
    return response.data;
  } catch (error) {
    console.error('Error creating exam center:', error);
    throw error;
  }
};

// Update an exam center
export const updateExamCenter = async (id, examCenterData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, examCenterData);
    return response.data;
  } catch (error) {
    console.error(`Error updating exam center with id ${id}:`, error);
    throw error;
  }
};

// Delete an exam center (soft delete)
export const deleteExamCenter = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting exam center with id ${id}:`, error);
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