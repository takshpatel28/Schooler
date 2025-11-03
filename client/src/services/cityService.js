import axios from 'axios';

const API_URL = 'http://localhost:5001/api/cities';

// Get all cities
export const getAllCities = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

// Get cities by district
export const getCitiesByDistrict = async (districtId) => {
  try {
    const response = await axios.get(`${API_URL}/district/${districtId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cities for district ${districtId}:`, error);
    throw error;
  }
};

// Get cities by state
export const getCitiesByState = async (stateId) => {
  try {
    const response = await axios.get(`${API_URL}/state/${stateId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cities for state ${stateId}:`, error);
    throw error;
  }
};

// Get a single city
export const getCity = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching city with id ${id}:`, error);
    throw error;
  }
};

// Create a new city
export const createCity = async (cityData) => {
  try {
    const response = await axios.post(API_URL, cityData);
    return response.data;
  } catch (error) {
    console.error('Error creating city:', error);
    throw error;
  }
};

// Update a city
export const updateCity = async (id, cityData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, cityData);
    return response.data;
  } catch (error) {
    console.error(`Error updating city with id ${id}:`, error);
    throw error;
  }
};

// Delete a city (soft delete)
export const deleteCity = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting city with id ${id}:`, error);
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