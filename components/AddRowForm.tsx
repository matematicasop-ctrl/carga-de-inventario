import React, { useState } from 'react';
import { CATEGORIES, STATUSES } from '../constants';
import { SalesRecord } from '../types';

interface AddRowFormProps {
  onAdd: (record: Omit<SalesRecord, 'id'>) => void;
}

export const AddRowForm: React.FC<AddRowFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    product: '',
    category: CATEGORIES[0],
    units: 1,
    revenue: 0,
    status: STATUSES[0] as SalesRecord['status']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    // Reset necessary fields but keep date/defaults for ease of entry
    setFormData(prev => ({
      ...prev,
      product: '',
      units: 1,
      revenue: 0
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 no-print">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <i className="fas fa-plus-circle text-primary mr-2"></i> Add New Entry
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border"
            value={formData.date}
            onChange={e => setFormData({...formData, date: e.target.value})}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
          <input
            type="text"
            required
            placeholder="e.g. Service Plan A"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border"
            value={formData.product}
            onChange={e => setFormData({...formData, product: e.target.value})}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border"
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
          <input
            type="number"
            min="1"
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border"
            value={formData.units}
            onChange={e => setFormData({...formData, units: parseInt(e.target.value) || 0})}
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Revenue ($)</label>
          <input
            type="number"
            min="0"
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2 border"
            value={formData.revenue}
            onChange={e => setFormData({...formData, revenue: parseFloat(e.target.value) || 0})}
          />
        </div>
        <div className="col-span-1 md:col-span-6 flex justify-end mt-2">
          <button
            type="submit"
            className="bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-colors shadow-sm"
          >
            Add to Sheet
          </button>
        </div>
      </form>
    </div>
  );
};