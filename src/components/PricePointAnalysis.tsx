import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PriceItem {
  id: string;
  price: string;
  brand: string;
  description: string;
  color: string;
  category: 'COOKIES' | 'CRACKERS';
}

const PricePointAnalysis = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<PriceItem[]>([
    { id: '1', price: '2.76', brand: 'Oreo', description: 'Original Sandwich Cookies', color: '#3b82f6', category: 'COOKIES' },
    { id: '2', price: '3.12', brand: 'Chips Ahoy', description: 'Chewy Chocolate Chip', color: '#ef4444', category: 'COOKIES' },
    { id: '3', price: '2.89', brand: 'Ritz', description: 'Original Crackers', color: '#f59e0b', category: 'CRACKERS' },
    { id: '4', price: '3.45', brand: 'Trident', description: 'Sugar Free Gum', color: '#10b981', category: 'COOKIES' },
    { id: '5', price: '2.67', brand: 'Sour Patch', description: 'Kids Candy', color: '#8b5cf6', category: 'COOKIES' },
    { id: '6', price: '4.17', brand: 'Oreo', description: 'Double Stuf Cookies', color: '#3b82f6', category: 'COOKIES' },
    { id: '7', price: '5.19', brand: 'Chips Ahoy', description: 'Chunky Cookies', color: '#ef4444', category: 'COOKIES' }
  ]);

  const SortableItem = ({ item }: { item: PriceItem }) => {
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
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-white rounded-lg border p-4 cursor-move hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium"
              style={{ backgroundColor: item.color }}
            >
              {item.brand.substring(0, 2)}
            </div>
            <div>
              <div className="font-medium text-gray-900">{item.brand}</div>
              <div className="text-sm text-gray-500">{item.description}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">${item.price}</div>
            <div className="text-sm text-gray-500">{item.category}</div>
          </div>
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Price Point Analysis</h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Drag items to reorder
          </div>
          <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
            <option>Price Low to High</option>
            <option>Price High to Low</option>
            <option>Brand A-Z</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Side - COOKIES */}
        <div>
          <div className="text-center mb-4">
            <div className="text-lg font-semibold text-gray-900">COOKIES</div>
            <div className="text-sm text-gray-500">Drag items vertically</div>
          </div>
          <div className="space-y-1">
            {[0, 1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="h-12 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Middle - Draggable Items */}
        <div>
          <div className="text-center mb-4">
            <div className="text-lg font-semibold text-gray-900">Products</div>
            <div className="text-sm text-gray-500">Drag to reorder</div>
          </div>
          
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {items.map((item) => (
                  <SortableItem key={item.id} item={item} />
                ))}
              </div>
            </SortableContext>
            
            <DragOverlay>
              {activeItem ? <SortableItem item={activeItem} /> : null}
            </DragOverlay>
          </DndContext>
        </div>

        {/* Right Side - CRACKERS */}
        <div>
          <div className="text-center mb-4">
            <div className="text-lg font-semibold text-gray-900">CRACKERS</div>
            <div className="text-sm text-gray-500">Drop zone</div>
          </div>
          <div className="space-y-1">
            {[0, 1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="h-12 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
        <span>Manufacturer Suggested Retail Price (MSRP)</span>
        <span>Updated: Jan 2024</span>
      </div>
    </div>
  );
};

export default PricePointAnalysis;