import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus } from 'lucide-react';

interface PriceItem {
  id: string;
  price: string;
  brand: string;
  description: string;
  color: string;
  size: string;
  grWeight: string;
  pricePerGr: string;
  category: string;
}

interface SOMData {
  left: string;
  right: string;
}

const PricePointAnalysis = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<PriceItem[]>([
    { 
      id: '1', 
      price: '$70', 
      brand: 'Takis', 
      description: '12X-FAMILIAR', 
      color: '#f59e0b', 
      size: '284.36 GR',
      grWeight: '$246',
      pricePerGr: '0.00pp',
      category: 'FAMILIAR'
    },
    { 
      id: '2', 
      price: '$51', 
      brand: 'Sabritas', 
      description: '12X-FAMILIAR', 
      color: '#ef4444', 
      size: '161.38 GR',
      grWeight: '$318.22',
      pricePerGr: '0.00pp',
      category: 'FAMILIAR'
    },
    { 
      id: '3', 
      price: '$48', 
      brand: 'Chips', 
      description: '12X-FAMILIAR', 
      color: '#06b6d4', 
      size: '169.79 GR',
      grWeight: '$286',
      pricePerGr: '0.00pp',
      category: 'FAMILIAR'
    },
    { 
      id: '4', 
      price: '$33', 
      brand: 'Sabritas', 
      description: '11X-COMPARTE', 
      color: '#ef4444', 
      size: '105.58 GR',
      grWeight: '$314',
      pricePerGr: '0.00pp',
      category: 'COMPARTE'
    },
    { 
      id: '5', 
      price: '$22', 
      brand: 'Doritos', 
      description: '09X-JUMBO', 
      color: '#f97316', 
      size: '104.92 GR',
      grWeight: '$207',
      pricePerGr: '0.00pp',
      category: 'JUMBO'
    },
    { 
      id: '6', 
      price: '$17', 
      brand: 'Chips', 
      description: '12X-FAMILIAR', 
      color: '#06b6d4', 
      size: '284.36 GR',
      grWeight: '$59',
      pricePerGr: '0.00pp',
      category: 'FAMILIAR'
    }
  ]);

  const [somData] = useState<SOMData[]>([
    { left: '0.00pp', right: '0.00pp' },
    { left: '0.00pp', right: '0.00pp' },
    { left: '0.00pp', right: '1.37' },
    { left: '0.00pp', right: '0.00pp' },
    { left: '0.00pp', right: '0.00pp' },
    { left: '0.00pp', right: '5.18' }
  ]);

  const SortableItem = ({ item, index }: { item: PriceItem; index: number }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: item.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <div className="flex items-center w-full mb-2">
        {/* Left SOM */}
        <div className="w-20 text-center">
          <div className="text-sm font-medium text-gray-900">{somData[index]?.left || '0'}</div>
          <div className="text-xs text-gray-500">0.00pp</div>
        </div>

        {/* Main draggable content */}
        <div className="flex-1 mx-4">
          <div
            ref={setNodeRef}
            style={style}
            className="bg-blue-50 rounded-lg p-3 cursor-move hover:shadow-md transition-all duration-200 border-2 border-dashed border-blue-200"
            {...attributes}
            {...listeners}
          >
            <div className="flex items-center justify-between">
              {/* Left side - Brand cards */}
              <div className="flex items-center space-x-2">
                {item.brand === 'Sabritas' && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded text-xs font-medium">
                    {item.size}<br/>
                    {item.grWeight}<br/>
                    {item.pricePerGr}<br/>
                    {item.description}
                  </div>
                )}
                {item.brand === 'Doritos' && (
                  <div className="bg-orange-500 text-white px-3 py-1 rounded text-xs font-medium">
                    {item.size}<br/>
                    {item.grWeight}<br/>
                    {item.pricePerGr}<br/>
                    {item.description}
                  </div>
                )}
                {item.brand === 'Chips' && (
                  <div className="bg-cyan-500 text-white px-3 py-1 rounded text-xs font-medium">
                    {item.size}<br/>
                    {item.grWeight}<br/>
                    {item.pricePerGr}<br/>
                    {item.description}
                  </div>
                )}
                {item.brand === 'Takis' && (
                  <div className="bg-yellow-500 text-white px-3 py-1 rounded text-xs font-medium">
                    {item.size}<br/>
                    {item.grWeight}<br/>
                    {item.pricePerGr}<br/>
                    {item.description}
                  </div>
                )}
              </div>

              {/* Center - Price */}
              <div className="mx-4">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-lg font-bold"
                  style={{ backgroundColor: '#1e88e5' }}
                >
                  {item.price}
                </div>
              </div>

              {/* Drag handle */}
              <div className="text-gray-400 hover:text-gray-600">
                <GripVertical size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Right SOM */}
        <div className="w-20 text-center">
          <div className="text-sm font-medium text-gray-900">{somData[index]?.right || '0'}</div>
          <div className="text-xs text-gray-500">0.00pp</div>
        </div>
      </div>
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    
    setActiveId(null);
  };

  const activeItem = items.find(item => item.id === activeId);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-gray-900">Price Point Analysis</h2>
          <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs text-white">?</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Manufacturer(Competitor): <span className="font-medium">BIMBO</span>
          </div>
          <div className="text-sm text-gray-600">
            Price Ladder <span className="inline-block w-3 h-3 bg-blue-600 rounded-full ml-1"></span> Price Buckets
          </div>
        </div>
      </div>

      {/* Brand Selection */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img src="https://via.placeholder.com/40x40/1e88e5/ffffff?text=P" alt="Pepsico" className="w-10 h-10 rounded" />
            <div>
              <div className="text-sm font-medium">Selected / Total</div>
              <div className="text-xs text-gray-600">13.37 / 60.73</div>
              <div className="text-xs text-green-600">0.00pp / +60.73pp</div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img src="https://via.placeholder.com/40x40/ef4444/ffffff?text=B" alt="Bimbo" className="w-10 h-10 rounded" />
            <div>
              <div className="text-sm font-medium">Selected / Total</div>
              <div className="text-xs text-gray-600">12.98 / 18.64</div>
              <div className="text-xs text-green-600">0.00pp / +18.64pp</div>
            </div>
          </div>
        </div>
      </div>

      {/* Column Headers */}
      <div className="flex items-center mb-4">
        <div className="w-20 text-center">
          <div className="text-sm font-medium text-gray-900">SOM($)</div>
        </div>
        <div className="flex-1 mx-4 text-center">
          <div className="text-sm font-medium text-gray-900">← SRP/SOP →</div>
        </div>
        <div className="w-20 text-center">
          <div className="text-sm font-medium text-gray-900">SOM($)</div>
        </div>
      </div>

      {/* Draggable Items */}
      <DndContext 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((item, index) => (
              <SortableItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </SortableContext>
        
        <DragOverlay>
          {activeItem ? (
            <div className="bg-blue-50 rounded-lg p-3 shadow-lg border-2 border-blue-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="px-3 py-1 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: activeItem.color }}
                  >
                    {activeItem.size}<br/>
                    {activeItem.grWeight}<br/>
                    {activeItem.pricePerGr}<br/>
                    {activeItem.description}
                  </div>
                </div>
                <div className="mx-4">
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-lg font-bold"
                    style={{ backgroundColor: '#1e88e5' }}
                  >
                    {activeItem.price}
                  </div>
                </div>
                <div className="text-gray-400">
                  <GripVertical size={20} />
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Add Button */}
      <div className="flex justify-center mt-6">
        <button className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
          <Plus size={24} />
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
          <span>Volume</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-600 rounded"></div>
          <span>PPV</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-600 rounded"></div>
          <span>% Change in SOM</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cyan-600 rounded"></div>
          <span>SOP</span>
        </div>
      </div>
    </div>
  );
};

export default PricePointAnalysis;