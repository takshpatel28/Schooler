const xlsx = require('xlsx');
const path = require('path');

// Mock data for demonstration
let mockYears = [
  {
    _id: '1',
    yearId: 'Y2023',
    year: '2023-2024',
    instituteId: 'INST001',
    academy: 'Engineering',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2024-05-31'),
    finalYear: false,
    active: true,
    isDeleted: false,
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-15')
  },
  {
    _id: '2',
    yearId: 'Y2022',
    year: '2022-2023',
    instituteId: 'INST001',
    academy: 'Engineering',
    startDate: new Date('2022-06-01'),
    endDate: new Date('2023-05-31'),
    finalYear: true,
    active: true,
    isDeleted: false,
    createdAt: new Date('2022-05-15'),
    updatedAt: new Date('2022-05-15')
  }
];

// Get all active (non-deleted) years
exports.getActiveYears = async (req, res) => {
  try {
    const years = mockYears.filter(year => !year.isDeleted);
    res.status(200).json(years);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching years', error: error.message });
  }
};

// Get all years (including deleted)
exports.getAllYears = async (req, res) => {
  try {
    res.status(200).json(mockYears);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all years', error: error.message });
  }
};

// Create a new year
exports.createYear = async (req, res) => {
  try {
    const newYear = {
      _id: (mockYears.length + 1).toString(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockYears.push(newYear);
    res.status(201).json(newYear);
  } catch (error) {
    res.status(400).json({ message: 'Error creating year', error: error.message });
  }
};

// Update an existing year
exports.updateYear = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body, updatedAt: new Date() };
    
    const yearIndex = mockYears.findIndex(year => year._id === id);
    if (yearIndex === -1) {
      return res.status(404).json({ message: 'Year not found' });
    }
    
    mockYears[yearIndex] = { ...mockYears[yearIndex], ...updatedData };
    const updatedYear = mockYears[yearIndex];
    
    res.status(200).json(updatedYear);
  } catch (error) {
    res.status(400).json({ message: 'Error updating year', error: error.message });
  }
};

// Toggle year active status (and isDeleted)
exports.toggleYearStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const yearIndex = mockYears.findIndex(year => year._id === id);
    if (yearIndex === -1) {
      return res.status(404).json({ message: 'Year not found' });
    }
    
    // Toggle active status
    const newActiveStatus = !mockYears[yearIndex].active;
    
    // Apply soft delete rule: active=false → isDeleted=true, active=true → isDeleted=false
    mockYears[yearIndex] = {
      ...mockYears[yearIndex],
      active: newActiveStatus,
      isDeleted: !newActiveStatus,
      updatedAt: new Date()
    };
    
    res.status(200).json(mockYears[yearIndex]);
  } catch (error) {
    res.status(400).json({ message: 'Error toggling year status', error: error.message });
  }
};

// Upload Excel file
exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const filePath = path.join(process.cwd(), req.file.path);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    
    if (data.length === 0) {
      return res.status(400).json({ message: 'Excel file is empty' });
    }
    
    // Validate required columns
    const requiredColumns = ['yearId', 'year', 'instituteId'];
    const firstRow = data[0];
    
    for (const column of requiredColumns) {
      if (!(column in firstRow)) {
        return res.status(400).json({ message: `Missing required column: ${column}` });
      }
    }
    
    // Process data
    let insertedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const row of data) {
      try {
        // Format dates if they exist
        if (row.startDate) {
          // Excel dates are stored as numbers, convert to JS Date
          if (typeof row.startDate === 'number') {
            const excelEpoch = new Date(1899, 11, 30);
            row.startDate = new Date(excelEpoch.getTime() + row.startDate * 24 * 60 * 60 * 1000);
          } else {
            row.startDate = new Date(row.startDate);
          }
        }
        
        if (row.endDate) {
          if (typeof row.endDate === 'number') {
            const excelEpoch = new Date(1899, 11, 30);
            row.endDate = new Date(excelEpoch.getTime() + row.endDate * 24 * 60 * 60 * 1000);
          } else {
            row.endDate = new Date(row.endDate);
          }
        }
        
        // Convert string 'true'/'false' to boolean
        if (typeof row.finalYear === 'string') {
          row.finalYear = row.finalYear.toLowerCase() === 'true';
        }
        
        if (typeof row.active === 'string') {
          row.active = row.active.toLowerCase() === 'true';
        }
        
        // Set isDeleted based on active status
        row.isDeleted = !row.active;
        
        // Check if record exists
        const existingYearIndex = mockYears.findIndex(year => year.yearId === row.yearId);
        
        if (existingYearIndex !== -1) {
          // Update existing record
          mockYears[existingYearIndex] = {
            ...mockYears[existingYearIndex],
            ...row,
            updatedAt: new Date()
          };
          updatedCount++;
        } else {
          // Insert new record
          const newYear = {
            _id: (mockYears.length + 1).toString(),
            ...row,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          mockYears.push(newYear);
          insertedCount++;
        }
      } catch (error) {
        console.error('Error processing row:', error);
        skippedCount++;
      }
    }
    
    res.status(200).json({
      message: 'Excel file processed successfully',
      insertedCount,
      updatedCount,
      skippedCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing Excel file', error: error.message });
  }
};