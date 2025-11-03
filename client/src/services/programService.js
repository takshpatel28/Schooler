import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// सभी प्रोग्राम्स प्राप्त करें
export const getAllPrograms = async () => {
  try {
    const response = await axios.get(`${API_URL}/programs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw error;
  }
};

// नया प्रोग्राम बनाएं
export const createProgram = async (programData) => {
  try {
    const response = await axios.post(`${API_URL}/programs`, programData);
    return response.data;
  } catch (error) {
    console.error('Error creating program:', error);
    throw error;
  }
};

// प्रोग्राम को ID से प्राप्त करें
export const getProgramById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/programs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching program with id ${id}:`, error);
    throw error;
  }
};

// प्रोग्राम को अपडेट करें
export const updateProgram = async (id, programData) => {
  try {
    const response = await axios.put(`${API_URL}/programs/${id}`, programData);
    return response.data;
  } catch (error) {
    console.error(`Error updating program with id ${id}:`, error);
    throw error;
  }
};

// प्रोग्राम को हटाएं
export const deleteProgram = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/programs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting program with id ${id}:`, error);
    throw error;
  }
};