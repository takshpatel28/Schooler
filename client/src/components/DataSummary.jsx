import React from 'react';
import { FaSync } from 'react-icons/fa';

const DataSummary = ({ title = 'Summary', stats = [], onRefresh }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md flex items-center"
          >
            <FaSync className="mr-2" /> Refresh
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="rounded-lg border bg-gray-50 p-4 flex items-center">
              {Icon && (
                <div className={`mr-3 p-2 rounded-full ${item.iconBg || 'bg-blue-100'}`}>
                  <Icon className={`text-xl ${item.iconColor || 'text-blue-600'}`} />
                </div>
              )}
              <div>
                <div className="text-sm text-gray-500">{item.label}</div>
                <div className="text-xl font-semibold text-gray-800">{item.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataSummary;