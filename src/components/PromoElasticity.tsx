import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PromoElasticity = () => {
  const elasticityData = [
    { x: -1.8, y: 1.2, brand: 'COOKIES BROWNIE MIX 16-20 LARGE', color: '#3b82f6', size: 40 },
    { x: -0.8, y: 0.8, brand: 'SEMI CHOCOLATE MIX 16-20 LARGE', color: '#10b981', size: 35 },
    { x: -1.2, y: 1.5, brand: 'CHOCOLATE REGULAR MIX 16-20 LARGE', color: '#ef4444', size: 50 },
    { x: -0.6, y: 0.6, brand: 'SHORTBREAD REGULAR MIX 16-20 LARGE', color: '#f59e0b', size: 30 },
    { x: -1.5, y: 1.8, brand: 'COOKIES CHOCO MIX 16-20 LARGE', color: '#8b5cf6', size: 45 },
    { x: -2.1, y: 2.2, brand: 'CHOCOLATE REGULAR MIX 16-20 LARGE', color: '#ec4899', size: 55 },
    { x: -0.9, y: 1.1, brand: 'MARSHMALLOW REGULAR MIX 16-20 LARGE', color: '#06b6d4', size: 38 },
    { x: -1.7, y: 1.9, brand: 'WHEAT CLASSICS MIX 16-20 LARGE', color: '#84cc16', size: 42 }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg max-w-xs">
          <p className="font-medium text-gray-900 text-sm">{data.brand}</p>
          <p className="text-sm text-gray-600">Net Price Elasticity: {data.x}</p>
          <p className="text-sm text-gray-600">Promo Elasticity: {data.y}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Promo Elasticity vs Price Elasticity</h2>
        <div className="flex items-center space-x-4">
          <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
            <option>Biscuits</option>
            <option>Beverages</option>
            <option>Snacks</option>
          </select>
          <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
            <option>All Categories</option>
            <option>Premium</option>
            <option>Regular</option>
          </select>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              type="number" 
              dataKey="x" 
              domain={[-2.5, 0]}
              name="Net Price Elasticity"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              label={{ value: 'Net Price Elasticity', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fontSize: '12px', fill: '#666' } }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              domain={[0, 2.5]}
              name="Promo Elasticity"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              label={{ value: 'Promo Elasticity', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: '12px', fill: '#666' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            {elasticityData.map((item, index) => (
              <Scatter 
                key={index}
                data={[item]} 
                fill={item.color}
                fillOpacity={0.7}
                stroke={item.color}
                strokeWidth={2}
                r={8}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900">Legend - Product Categories</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {elasticityData.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-700 truncate">{item.brand.split(' ').slice(0, 2).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900">Insights</h3>
          <div className="text-xs text-gray-600 space-y-1">
            <p>• Higher promo elasticity indicates stronger response to promotions</p>
            <p>• Negative price elasticity shows demand decrease with price increases</p>
            <p>• Optimal positioning balances both elasticity measures</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoElasticity;