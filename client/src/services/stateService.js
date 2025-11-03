import axios from 'axios';

const API_URL = 'http://localhost:5001/api/states';

// Get all states
export const getAllStates = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching states:', error);
    throw error;
  }
};

// Get a single state
export const getState = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching state with id ${id}:`, error);
    throw error;
  }
};

// Create a new state
export const createState = async (stateData) => {
  try {
    const response = await axios.post(API_URL, stateData);
    return response.data;
  } catch (error) {
    console.error('Error creating state:', error);
    throw error;
  }
};

// Update a state
export const updateState = async (id, stateData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, stateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating state with id ${id}:`, error);
    throw error;
  }
};

// Delete a state (soft delete)
export const deleteState = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting state with id ${id}:`, error);
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