import React, { useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IncentiveCurve = () => {
  const [chartData, setChartData] = useState([
    { month: 'JAN', volume: 155, line: 125, brand: 'Oreo' },
    { month: 'FEB', volume: 165, line: 135, brand: 'Chips Ahoy' },
    { month: 'MAR', volume: 180, line: 140, brand: 'Ritz' },
    { month: 'APR', volume: 195, line: 145, brand: 'Trident' },
    { month: 'MAY', volume: 220, line: 150, brand: 'Sour Patch' },
    { month: 'JUN', volume: 185, line: 155, brand: 'Oreo' },
    { month: 'JUL', volume: 175, line: 140, brand: 'Chips Ahoy' },
    { month: 'AUG', volume: 160, line: 135, brand: 'Ritz' },
    { month: 'SEP', volume: 170, line: 145, brand: 'Trident' },
    { month: 'OCT', volume: 185, line: 150, brand: 'Sour Patch' },
    { month: 'NOV', volume: 200, line: 155, brand: 'Oreo' },
    { month: 'DEC', volume: 190, line: 160, brand: 'Chips Ahoy' }
  ]);

  const [draggedPoint, setDraggedPoint] = useState<number | null>(null);

  const handleLinePointDrag = (index: number, newValue: number) => {
    const newData = [...chartData];
    newData[index].line = Math.max(0, Math.min(250, newValue));
    setChartData(newData);
  };

  const CustomDot = (props: any) => {
    const { cx, cy, index } = props;
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="#1e40af"
        stroke="#ffffff"
        strokeWidth={2}
        style={{ cursor: 'ns-resize' }}
        onMouseDown={() => setDraggedPoint(index)}
      />
    );
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedPoint !== null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const chartHeight = 300;
      const newValue = Math.round(((chartHeight - y) / chartHeight) * 250);
      handleLinePointDrag(draggedPoint, newValue);
    }
  };

  const handleMouseUp = () => {
    setDraggedPoint(null);
  };

  const brands = ['Oreo', 'Chips Ahoy', 'Ritz', 'Trident', 'Sour Patch'];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Incentive Curve</h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Drag line points to adjust values
          </div>
          <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>

      {/* Brand logos placeholder */}
      <div className="flex items-center justify-center space-x-8 mb-6">
        {brands.map((brand, index) => (
          <div key={brand} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center border">
              <span className="text-xs font-medium text-gray-600">{brand.substring(0, 2)}</span>
            </div>
            <span className="text-sm text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      <div 
        className="h-96"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Bar 
              dataKey="volume" 
              fill="#3b82f6" 
              name="Volume"
              radius={[4, 4, 0, 0]}
            />
            <Line 
              type="monotone" 
              dataKey="line" 
              stroke="#1e40af" 
              strokeWidth={3}
              name="Incentive Line"
              dot={<CustomDot />}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>Jan 2024 - Dec 2024</span>
        <span>Values in thousands</span>
      </div>
    </div>
  );
};

export default IncentiveCurve;