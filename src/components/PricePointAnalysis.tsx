import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus } from 'lucide-react';

interface ProductItem {
  id: string;
  brand: string;
  description: string;
  color: string;
  size: string;
  grWeight: string;
  pricePerGr: string;
  category: string;
}

interface PriceTier {
  price: string;
  somLeft: string;
  somRight: string;
  products: ProductItem[];
}

const PricePointAnalysis = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTierId, setActiveTierId] = useState<string | null>(null);
  
  const [priceTiers, setPriceTiers] = useState<PriceTier[]>([
    {
      price: '$70',
      somLeft: '0',
      somRight: '0',
      products: [
        { 
          id: 'takis-1', 
          brand: 'Takis', 
          description: '12X-FAMILIAR', 
          color: '#f59e0b', 
          size: '284.36 GR',
          grWeight: '$246',
          pricePerGr: '0.00pp',
          category: 'FAMILIAR'
        }
      ]
    },
    {
      price: '$51',
      somLeft: '0.1',
      somRight: '0',
      products: [
        { 
          id: 'sabritas-1', 
          brand: 'Sabritas', 
          description: '12X-FAMILIAR', 
          color: '#ef4444', 
          size: '161.38 GR',
          grWeight: '$318.22',
          pricePerGr: '0.00pp',
          category: 'FAMILIAR'
        },
        { 
          id: 'doritos-1', 
          brand: 'Doritos', 
          description: '12X-FAMILIAR', 
          color: '#f97316', 
          size: '222.36 GR',
          grWeight: '$228.73',
          pricePerGr: '0.00pp',
          category: 'FAMILIAR'
        }
      ]
    },
    {
      price: '$48',
      somLeft: '0',
      somRight: '1.37',
      products: [
        { 
          id: 'chips-1', 
          brand: 'Chips', 
          description: '12X-FAMILIAR', 
          color: '#06b6d4', 
          size: '169.79 GR',
          grWeight: '$286',
          pricePerGr: '0.00pp',
          category: 'FAMILIAR'
        }
      ]
    },
    {
      price: '$33',
      somLeft: '0.26',
      somRight: '0',
      products: [
        { 
          id: 'sabritas-2', 
          brand: 'Sabritas', 
          description: '11X-COMPARTE', 
          color: '#ef4444', 
          size: '105.58 GR',
          grWeight: '$314',
          pricePerGr: '0.00pp',
          category: 'COMPARTE'
        },
        { 
          id: 'doritos-2', 
          brand: 'Doritos', 
          description: '11X-COMPARTE', 
          color: '#f97316', 
          size: '145.36 GR',
          grWeight: '$226',
          pricePerGr: '0.00pp',
          category: 'COMPARTE'
        }
      ]
    },
    {
      price: '$22',
      somLeft: '1.96',
      somRight: '0',
      products: [
        { 
          id: 'doritos-3', 
          brand: 'Doritos', 
          description: '09X-JUMBO', 
          color: '#f97316', 
          size: '104.92 GR',
          grWeight: '$207',
          pricePerGr: '0.00pp',
          category: 'JUMBO'
        },
        { 
          id: 'sabritas-3', 
          brand: 'Sabritas', 
          description: '09X-JUMBO', 
          color: '#ef4444', 
          size: '145.74 GR',
          grWeight: '$226',
          pricePerGr: '0.00pp',
          category: 'JUMBO'
        }
      ]
    },
    {
      price: '$17',
      somLeft: '11.05',
      somRight: '5.18',
      products: [
        { 
          id: 'chips-2', 
          brand: 'Chips', 
          description: '12X-FAMILIAR', 
          color: '#06b6d4', 
          size: '284.36 GR',
          grWeight: '$59',
          pricePerGr: '0.00pp',
          category: 'FAMILIAR'
        }
      ]
    }
  ]);

  const SortableProduct = ({ product, tierId }: { product: ProductItem; tierId: string }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: `${tierId}-${product.id}` });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    const getBrandColor = (brand: string) => {
      switch (brand) {
        case 'Sabritas': return '#ef4444';
        case 'Doritos': return '#f97316';
        case 'Chips': return '#06b6d4';
        case 'Takis': return '#f59e0b';
        default: return '#6b7280';
      }
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-sm border cursor-move hover:shadow-md transition-all duration-200"
        {...attributes}
        {...listeners}
      >
        <div 
          className="px-3 py-2 rounded text-xs font-medium text-white min-w-[80px] text-center"
          style={{ backgroundColor: getBrandColor(product.brand) }}
        >
          <div className="font-bold">{product.size}</div>
          <div>{product.grWeight}</div>
          <div>{product.pricePerGr}</div>
          <div>{product.description}</div>
        </div>
        <div className="text-gray-400 hover:text-gray-600">
          <GripVertical size={16} />
        </div>
      </div>
    );
  };

  const DroppableRow = ({ tier, index }: { tier: PriceTier; index: number }) => {
    const tierId = `tier-${index}`;
    
    return (
      <div className="flex items-center w-full mb-3 min-h-[80px]">
        {/* Left SOM */}
        <div className="w-20 text-center">
          <div className="text-sm font-medium text-gray-900">{tier.somLeft}</div>
          <div className="text-xs text-gray-500">0.00pp</div>
        </div>

        {/* Main content area */}
        <div className="flex-1 mx-4">
          <div className="bg-blue-50 rounded-lg p-4 border-2 border-dashed border-blue-200 min-h-[72px]">
            <div className="flex items-center justify-between">
              {/* Left side - Products */}
              <div className="flex-1">
                <SortableContext items={tier.products.map(p => `${tierId}-${p.id}`)} strategy={horizontalListSortingStrategy}>
                  <div className="flex items-center space-x-3 flex-wrap gap-2">
                    {tier.products.map((product) => (
                      <SortableProduct key={product.id} product={product} tierId={tierId} />
                    ))}
                  </div>
                </SortableContext>
              </div>

              {/* Center - Price */}
              <div className="mx-4">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-lg font-bold"
                  style={{ backgroundColor: '#1e88e5' }}
                >
                  {tier.price}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right SOM */}
        <div className="w-20 text-center">
          <div className="text-sm font-medium text-gray-900">{tier.somRight}</div>
          <div className="text-xs text-gray-500">0.00pp</div>
        </div>
      </div>
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeIdStr = event.active.id as string;
    setActiveId(activeIdStr);
    
    // Extract tier ID from the active ID
    const tierMatch = activeIdStr.match(/^tier-(\d+)-/);
    if (tierMatch) {
      setActiveTierId(`tier-${tierMatch[1]}`);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      setActiveTierId(null);
      return;
    }

    const activeIdStr = active.id as string;
    const overIdStr = over.id as string;

    // Extract tier and product IDs
    const activeMatch = activeIdStr.match(/^tier-(\d+)-(.+)$/);
    const overMatch = overIdStr.match(/^tier-(\d+)-(.+)$/);

    if (!activeMatch || !overMatch) {
      setActiveId(null);
      setActiveTierId(null);
      return;
    }

    const activeTierIndex = parseInt(activeMatch[1]);
    const activeProductId = activeMatch[2];
    const overTierIndex = parseInt(overMatch[1]);
    const overProductId = overMatch[2];

    if (activeTierIndex === overTierIndex && activeProductId !== overProductId) {
      // Reordering within the same tier
      setPriceTiers(prevTiers => {
        const newTiers = [...prevTiers];
        const tier = newTiers[activeTierIndex];
        const oldIndex = tier.products.findIndex(p => p.id === activeProductId);
        const newIndex = tier.products.findIndex(p => p.id === overProductId);
        
        if (oldIndex !== -1 && newIndex !== -1) {
          tier.products = arrayMove(tier.products, oldIndex, newIndex);
        }
        
        return newTiers;
      });
    } else if (activeTierIndex !== overTierIndex) {
      // Moving between different tiers
      setPriceTiers(prevTiers => {
        const newTiers = [...prevTiers];
        const sourceTier = newTiers[activeTierIndex];
        const targetTier = newTiers[overTierIndex];
        
        const productIndex = sourceTier.products.findIndex(p => p.id === activeProductId);
        if (productIndex !== -1) {
          const [product] = sourceTier.products.splice(productIndex, 1);
          const targetIndex = targetTier.products.findIndex(p => p.id === overProductId);
          
          if (targetIndex !== -1) {
            targetTier.products.splice(targetIndex, 0, product);
          } else {
            targetTier.products.push(product);
          }
        }
        
        return newTiers;
      });
    }
    
    setActiveId(null);
    setActiveTierId(null);
  };

  const activeProduct = activeId && activeTierId ? 
    priceTiers.find((_, index) => `tier-${index}` === activeTierId)?.products.find(p => 
      activeId === `${activeTierId}-${p.id}`
    ) : null;

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

      {/* Price Tiers with Drag and Drop */}
      <DndContext 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <div className="space-y-2">
          {priceTiers.map((tier, index) => (
            <DroppableRow key={`tier-${index}`} tier={tier} index={index} />
          ))}
        </div>
        
        <DragOverlay>
          {activeProduct ? (
            <div className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-lg border-2 border-blue-300">
              <div 
                className="px-3 py-2 rounded text-xs font-medium text-white min-w-[80px] text-center"
                style={{ backgroundColor: activeProduct.color }}
              >
                <div className="font-bold">{activeProduct.size}</div>
                <div>{activeProduct.grWeight}</div>
                <div>{activeProduct.pricePerGr}</div>
                <div>{activeProduct.description}</div>
              </div>
              <div className="text-gray-400">
                <GripVertical size={16} />
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