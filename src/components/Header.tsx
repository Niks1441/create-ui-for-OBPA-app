import React from 'react';
import { Download, Share2, Calendar, MessageCircle, Search } from 'lucide-react';

const Header = () => {
  const tabs = [
    'Occasions and Pack Roles',
    'Incremental Opportunities', 
    'Switching Matrix',
    'Strategy Execution'
  ];

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">IO</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Incremental Opportunities</h1>
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <MessageCircle size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Calendar size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Share2 size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Download size={20} />
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                index === 1 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;