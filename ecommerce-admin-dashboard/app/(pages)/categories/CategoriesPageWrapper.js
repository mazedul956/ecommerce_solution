// app/categories/CategoriesPageWrapper.js
'use client';
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import CategoriesTable from './CategoriesTable';
import Filters from './Filters';
// import BulkActions from './BulkActions';
import Pagination from '../../../components/Pagination';
import DeleteModal from '@/components/DeleteModal';

export default function CategoriesPageWrapper({ categories, pagination, currentPage, filters }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.set('page', '1'); // Reset to the first page when filters change
    router.push(`${pathname}?${params.toString()}`);
  };

  // Handle category selection
  const toggleSelectCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  // Handle delete confirmation
  const handleDeleteCategories = () => {
    console.log('Deleting categories:', selectedCategories);
    // Add actual delete logic here
    setSelectedCategories([]);
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <CategoriesTable
        categories={categories}
        selectedCategories={selectedCategories}
        toggleSelectCategory={toggleSelectCategory}
        onDeleteClick={() => setIsDeleteModalOpen(true)}
      />
      <Pagination currentPage={currentPage} totalPages={pagination.totalPages} />
      {/* <BulkActions selectedCount={selectedCategories.length} actions={[]} /> */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCategories}
        itemName="category"
        selectedCount={selectedCategories.length}
      />
    </div>
  );
}