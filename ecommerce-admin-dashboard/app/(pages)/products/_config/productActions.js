import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export const productActions = (toggleSelect, onDelete) => [
    {
      key: 'edit',
      icon: PencilSquareIcon,
      href: (item) => `/products/${item._id}/edit`,
      iconClassName: 'text-blue-600'
    },
    {
      key: 'delete',
      icon: TrashIcon,
      onClick: (itemId) => {
        toggleSelect(itemId);
        onDelete();
      },
      iconClassName: 'text-red-500'
    }
  ];