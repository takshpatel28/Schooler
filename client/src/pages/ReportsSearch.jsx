import React, { useState, useEffect } from 'react';
import { FaSearch, FaDownload, FaPrint, FaChartBar, FaUsers, FaBuilding, FaClipboardList, FaBarcode, FaFileAlt, FaFilter } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import DataSummary from '../components/DataSummary';
import { FaChartPie, FaListUl } from 'react-icons/fa';

const ReportsSearch = () => {
  const [reports] = useState([
    {
      id: 'pre-exam-student-summary',
      name: 'Pre-Exam Student Summary',
      category: 'Pre-Examination',
      icon: FaUsers,
      description: 'Summary of all students appearing for exams',
      filters: ['institute', 'semester', 'year', 'program']
    },
    {
      id: 'pre-exam-exam-center-summary',
      name: 'Exam Center Summary',
      category: 'Pre-Examination',
      icon: FaBuilding,
      description: 'Summary of all exam centers and their capacity',
      filters: ['institute', 'semester', 'year']
    },
    {
      id: 'pre-exam-attendance-report',
      name: 'Attendance Report',
      category: 'Pre-Examination',
      icon: FaClipboardList,
      description: 'Student attendance report for examinations',
      filters: ['institute', 'semester', 'year', 'program']
    },
    {
      id: 'pre-exam-seat-allocation',
      name: 'Seat Allocation Report',
      category: 'Pre-Examination',
      icon: FaChartBar,
      description: 'Seat allocation and arrangement details',
      filters: ['institute', 'semester', 'year', 'program']
    },
    {
      id: 'pre-exam-barcode-summary',
      name: 'Barcode Generation Summary',
      category: 'Pre-Examination',
      icon: FaBarcode,
      description: 'Summary of generated barcodes for examinations',
      filters: ['institute', 'semester', 'year', 'program']
    },
    {
      id: 'post-exam-result-analysis',
      name: 'Post-Exam Result Analysis',
      category: 'Post-Examination',
      icon: FaChartBar,
      description: 'Comprehensive result analysis and statistics',
      filters: ['institute', 'semester', 'year', 'program']
    },
    {
      id: 'post-exam-student-performance',
      name: 'Student Performance Report',
      category: 'Post-Examination',
      icon: FaUsers,
      description: 'Individual student performance details',
      filters: ['institute', 'semester', 'year', 'program']
    },
    {
      id: 'reassessment-applications',
      name: 'Reassessment Applications',
      category: 'Reassessment',
      icon: FaFileAlt,
      description: 'Summary of reassessment applications received',
      filters: ['institute', 'semester', 'year', 'program']
    },
    {
      id: 'reassessment-results',
      name: 'Reassessment Results',
      category: 'Reassessment',
      icon: FaChartBar,
      description: 'Results after reassessment process',
      filters: ['institute', 'semester', 'year', 'program']
    },
    {
      id: 'notification-report',
      name: 'Examination Notifications',
      category: 'Notifications',
      icon: FaClipboardList,
      description: 'All examination related notifications',
      filters: ['institute', 'semester', 'year']
    },
    {
      id: 'admit-card-report',
      name: 'Admit Card Report',
      category: 'Examination',
      icon: FaFileAlt,
      description: 'Admit card generation and distribution report',
      filters: ['institute', 'semester', 'year', 'program']
    },
    {
      id: 'seating-plan-report',
      name: 'Seating Plan Report',
      category: 'Examination',
      icon: FaChartBar,
      description: 'Detailed seating arrangement plans',
      filters: ['institute', 'semester', 'year', 'program']
    },
    {
      id: 'invigilation-duty-report',
      name: 'Invigilation Duty Report',
      category: 'Examination',
      icon: FaUsers,
      description: 'Invigilation staff duty assignments',
      filters: ['institute', 'semester', 'year']
    }
  ]);

  const [filters, setFilters] = useState({
    instituteName: '',
    semester: '',
    year: '',
    program: '',
    category: '',
    searchTerm: ''
  });

  const [institutes, setInstitutes] = useState([
    { id: 'INST001', name: 'Government Engineering College' },
    { id: 'INST002', name: 'Private Engineering College' },
    { id: 'INST003', name: 'Medical College' },
    { id: 'INST004', name: 'Arts and Science College' }
  ]);

  const [semesters] = useState([
    { id: '1', name: 'Semester 1' },
    { id: '2', name: 'Semester 2' },
    { id: '3', name: 'Semester 3' },
    { id: '4', name: 'Semester 4' },
    { id: '5', name: 'Semester 5' },
    { id: '6', name: 'Semester 6' },
    { id: '7', name: 'Semester 7' },
    { id: '8', name: 'Semester 8' }
  ]);

  const [years] = useState([
    { id: '2024', name: '2024' },
    { id: '2023', name: '2023' },
    { id: '2022', name: '2022' },
    { id: '2021', name: '2021' }
  ]);

  const [programs] = useState([
    { id: 'BTECH', name: 'B.Tech' },
    { id: 'MTECH', name: 'M.Tech' },
    { id: 'MBA', name: 'MBA' },
    { id: 'MCA', name: 'MCA' },
    { id: 'BBA', name: 'BBA' },
    { id: 'BCA', name: 'BCA' }
  ]);

  const [categories] = useState([
    { id: 'Pre-Examination', name: 'Pre-Examination' },
    { id: 'Post-Examination', name: 'Post-Examination' },
    { id: 'Reassessment', name: 'Reassessment' },
    { id: 'Notifications', name: 'Notifications' },
    { id: 'Examination', name: 'Examination' }
  ]);

  const [filteredReports, setFilteredReports] = useState(reports);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    filterReports();
  }, [filters, reports]);

  const filterReports = () => {
    let filtered = reports;

    if (filters.searchTerm) {
      filtered = filtered.filter(report =>
        report.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        report.category.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(report => report.category === filters.category);
    }

    setFilteredReports(filtered);
  };

  const getSummary = () => {
    const total = filteredReports.length;
    const categoriesSet = new Set(filteredReports.map(r => r.category));
    const pre = filteredReports.filter(r => r.category === 'Pre-Examination').length;
    const post = filteredReports.filter(r => r.category === 'Post-Examination').length;
    const exam = filteredReports.filter(r => r.category === 'Examination').length;
    const reassess = filteredReports.filter(r => r.category === 'Reassessment').length;
    const notify = filteredReports.filter(r => r.category === 'Notifications').length;
    return { total, categories: categoriesSet.size, pre, post, exam, reassess, notify };
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      instituteName: '',
      semester: '',
      year: '',
      program: '',
      category: '',
      searchTerm: ''
    });
  };

  const generateReport = async (reportId, format = 'pdf') => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock report data
      const mockData = {
        reportName: reports.find(r => r.id === reportId)?.name,
        generatedAt: new Date().toLocaleString(),
        filters: filters,
        summary: {
          totalRecords: Math.floor(Math.random() * 1000) + 100,
          activeRecords: Math.floor(Math.random() * 800) + 50,
          pendingRecords: Math.floor(Math.random() * 200) + 10
        }
      };

      // Simulate file download
      const dataStr = JSON.stringify(mockData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportId}-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`${mockData.reportName} generated successfully!`);
    } catch (error) {
      toast.error('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const openReportModal = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Pre-Examination': 'bg-blue-100 text-blue-800',
      'Post-Examination': 'bg-green-100 text-green-800',
      'Reassessment': 'bg-orange-100 text-orange-800',
      'Notifications': 'bg-purple-100 text-purple-800',
      'Examination': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports Dashboard</h1>
          <p className="text-gray-600">Search, filter, and generate examination reports</p>
        </div>

        {/* Summary */}
        {(() => {
          const s = getSummary();
          return (
            <DataSummary
              title="Reports Overview"
              stats={[
                { label: 'Total Reports', value: s.total, icon: FaChartPie },
                { label: 'Categories', value: s.categories, icon: FaListUl },
                { label: 'Pre-Exam', value: s.pre, icon: FaFilter },
                { label: 'Post-Exam', value: s.post, icon: FaFilter },
                { label: 'Examination', value: s.exam, icon: FaFilter },
                { label: 'Reassessment', value: s.reassess, icon: FaFilter },
                { label: 'Notifications', value: s.notify, icon: FaFilter },
              ]}
              onRefresh={() => toast.success('Overview refreshed')}
            />
          );
        })()}

        {/* Advanced Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <FaFilter className="text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Advanced Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institute Name</label>
              <select
                value={filters.instituteName}
                onChange={(e) => handleFilterChange('instituteName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Institutes</option>
                {institutes.map(institute => (
                  <option key={institute.id} value={institute.id}>
                    {institute.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
              <select
                value={filters.semester}
                onChange={(e) => handleFilterChange('semester', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Semesters</option>
                {semesters.map(semester => (
                  <option key={semester.id} value={semester.id}>
                    {semester.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year.id} value={year.id}>
                    {year.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
              <select
                value={filters.program}
                onChange={(e) => handleFilterChange('program', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Programs</option>
                {programs.map(program => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredReports.map((report) => {
            const IconComponent = report.icon;
            return (
              <div key={report.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <IconComponent className="text-blue-600 text-xl" />
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(report.category)}`}>
                      {report.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Available Filters:</p>
                    <div className="flex flex-wrap gap-1">
                      {report.filters.map((filter) => (
                        <span key={filter} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {filter}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => openReportModal(report)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => generateReport(report.id, 'pdf')}
                      disabled={loading}
                      className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                    >
                      <FaDownload />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FaSearch className="text-gray-400 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No reports found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Report Details Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{selectedReport.name}</h2>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">{selectedReport.description}</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-gray-800 mb-2">Current Filters Applied:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Institute:</span>
                    <span className="ml-2 font-medium">
                      {filters.instituteName ? institutes.find(i => i.id === filters.instituteName)?.name : 'All Institutes'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Semester:</span>
                    <span className="ml-2 font-medium">
                      {filters.semester ? semesters.find(s => s.id === filters.semester)?.name : 'All Semesters'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Year:</span>
                    <span className="ml-2 font-medium">
                      {filters.year ? years.find(y => y.id === filters.year)?.name : 'All Years'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Program:</span>
                    <span className="ml-2 font-medium">
                      {filters.program ? programs.find(p => p.id === filters.program)?.name : 'All Programs'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  generateReport(selectedReport.id, 'pdf');
                  setShowReportModal(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <FaDownload className="mr-2" /> Download PDF
              </button>
              <button
                onClick={() => {
                  generateReport(selectedReport.id, 'excel');
                  setShowReportModal(false);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <FaDownload className="mr-2" /> Download Excel
              </button>
              <button
                onClick={() => {
                  toast.success('Print functionality would be implemented here');
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <FaPrint />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsSearch;