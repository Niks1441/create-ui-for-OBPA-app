import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PricePremiumization = () => {
  const scatterData = [
    { x: 120, y: 85, brand: 'Oreo', size: 60 },
    { x: 95, y: 92, brand: 'Chips Ahoy', size: 45 },
    { x: 110, y: 78, brand: 'Ritz', size: 35 },
    { x: 85, y: 95, brand: 'Trident', size: 50 },
    { x: 105, y: 88, brand: 'Sour Patch', size: 40 },
    { x: 130, y: 72, brand: 'Oreo Premium', size: 55 },
    { x: 75, y: 98, brand: 'Store Brand', size: 30 },
    { x: 115, y: 82, brand: 'Pepperidge Farm', size: 48 },
    { x: 90, y: 90, brand: 'Keebler', size: 42 },
    { x: 125, y: 75, brand: 'Nabisco', size: 52 },
    { x: 80, y: 96, brand: 'Generic', size: 25 },
    { x: 140, y: 68, brand: 'Premium Brand', size: 58 },
    { x: 100, y: 85, brand: 'Mid-tier', size: 38 },
    { x: 135, y: 70, brand: 'Luxury', size: 60 },
    { x: 70, y: 99, brand: 'Value', size: 22 }
  ];

  const apiData = [
    { period: 'Q1', value: 1.2 },
    { period: 'Q2', value: 1.4 },
    { period: 'Q3', value: 1.1 },
    { period: 'Q4', value: 1.6 }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.brand}</p>
          <p className="text-sm text-gray-600">Price Index: {data.x}</p>
          <p className="text-sm text-gray-600">Quality Score: {data.y}</p>
          <p className="text-sm text-gray-600">Market Share: {data.size}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Price Premiumization</h2>
        <div className="flex items-center space-x-4">
          <button className="text-sm text-blue-600 hover:text-blue-800">All Filters</button>
          <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Scatter Plot */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Price vs Quality Perception</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  domain={[60, 150]}
                  name="Price Index"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  domain={[60, 100]}
                  name="Quality Score"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter 
                  data={scatterData} 
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  stroke="#1e40af"
                  strokeWidth={2}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>Bubble size represents market share</p>
            <p>Higher values indicate premium positioning</p>
          </div>
        </div>

        {/* Historical API */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Historical API</h3>
          <div className="space-y-4">
            {apiData.map((item, index) => (
              <div key={item.period} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{item.period}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${(item.value / 2) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-blue-900">Suggested Price Contribution (%)</div>
                <div className="text-xs text-blue-700">vs last quarter</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-900">85</div>
                <div className="text-sm text-blue-700">+3.2%</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Potential Score Impact</div>
                <div className="text-xs text-gray-600">Expected improvement</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">5.17%</div>
                <div className="text-sm text-gray-600">vs baseline</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricePremiumization;