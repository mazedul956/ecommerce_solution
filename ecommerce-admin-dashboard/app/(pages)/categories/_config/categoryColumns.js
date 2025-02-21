import { FolderIcon } from '@heroicons/react/24/outline';

export const categoryColumns = [
    {
      key: 'name',
      header: 'Category Name',
      renderCell: (category) => (
        <div className="flex items-center gap-2">
          <FolderIcon className="h-4 w-4" />
          <span>{category.name}</span>
        </div>
      )
    },
    { key: 'description', header: 'Description' },
    {
      key: 'parent',
      header: 'Parent Category',
      renderCell: (category) => category.parent?.name || '–'
    },
    {
      key: 'status',
      header: 'Status',
      renderCell: (category) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {category.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
  ];