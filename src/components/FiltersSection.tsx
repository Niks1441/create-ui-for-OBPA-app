import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

interface FiltersSectionProps {
  isOpen: boolean;
  onToggle: () => void;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({ isOpen, onToggle }) => {
  const [filters, setFilters] = useState({
    country: 'MEXICO',
    channel: 'DTS',
    geoLevel2: 'ALL',
    businessUnit: 'BISCUITS',
    timePeriod: '12MM',
    endTimePeriod: 'JAN-24'
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6 border">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {isOpen && (
        <div className="border-t p-6 space-y-6">
          {/* Geo Filters */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-gray-900">Geo Filters</h3>
              <ChevronUp size={16} className="text-blue-600" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select 
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="MEXICO">MEXICO</option>
                  <option value="USA">USA</option>
                  <option value="CANADA">CANADA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
                <select 
                  value={filters.channel}
                  onChange={(e) => handleFilterChange('channel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="DTS">DTS</option>
                  <option value="RETAIL">RETAIL</option>
                  <option value="ONLINE">ONLINE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Geo Level 2</label>
                <select 
                  value={filters.geoLevel2}
                  onChange={(e) => handleFilterChange('geoLevel2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ALL">ALL</option>
                  <option value="NORTH">NORTH</option>
                  <option value="SOUTH">SOUTH</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Filters */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-gray-900">Product Filters</h3>
              <ChevronUp size={16} className="text-blue-600" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Unit</label>
                <select 
                  value={filters.businessUnit}
                  onChange={(e) => handleFilterChange('businessUnit', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="BISCUITS">BISCUITS</option>
                  <option value="BEVERAGES">BEVERAGES</option>
                  <option value="SNACKS">SNACKS</option>
                </select>
              </div>
            </div>
          </div>

          {/* Date Filters */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-gray-900">Date Filters</h3>
              <ChevronUp size={16} className="text-blue-600" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                <select 
                  value={filters.timePeriod}
                  onChange={(e) => handleFilterChange('timePeriod', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="12MM">12MM</option>
                  <option value="6MM">6MM</option>
                  <option value="3MM">3MM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time Period</label>
                <select 
                  value={filters.endTimePeriod}
                  onChange={(e) => handleFilterChange('endTimePeriod', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="JAN-24">JAN-24</option>
                  <option value="FEB-24">FEB-24</option>
                  <option value="MAR-24">MAR-24</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 pt-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
              Apply Filter
            </button>
            <button className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors">
              Clear Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersSection;