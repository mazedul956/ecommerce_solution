// // app/categories/new/page.js
// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { ArrowLeftIcon, FolderIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';

// export default function CreateCategoryPage() {
//   const router = useRouter();
//   const [categories, setCategories] = useState([]); // Fetch existing categories from API
//   const [formData, setFormData] = useState({
//     name: '',
//     slug: '',
//     description: '',
//     parentCategory: null,
//     status: 'active',
//     image: null
//   });
//   const [previewImage, setPreviewImage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   // Fetch existing categories for parent selection
//   // useEffect(() => {
//   //   const fetchCategories = async () => {
//   //     try {
//   //       const response = await fetch('/api/categories');
//   //       const data = await response.json();
//   //       setCategories(data);
//   //     } catch (error) {
//   //       console.error('Error fetching categories:', error);
//   //     }
//   //   };
//   //   fetchCategories();
//   // }, []);

//   // Handle image selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, image: file });
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   // Remove selected image
//   const removeImage = () => {
//     setFormData({ ...formData, image: null });
//     setPreviewImage('');
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Category name is required';
//     if (!formData.slug.trim()) newErrors.slug = 'Category slug is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       const formPayload = new FormData();
//       formPayload.append('name', formData.name);
//       formPayload.append('slug', formData.slug);
//       formPayload.append('description', formData.description);
//       formPayload.append('parentCategory', formData.parentCategory);
//       formPayload.append('status', formData.status);
//       if (formData.image) formPayload.append('image', formData.image);

//       const response = await fetch('/api/categories', {
//         method: 'POST',
//         body: formPayload
//       });

//       if (response.ok) {
//         router.push('/categories');
//       } else {
//         const errorData = await response.json();
//         setErrors({ server: errorData.message || 'Failed to create category' });
//       }
//     } catch (error) {
//       setErrors({ server: 'An error occurred while saving the category' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-2xl font-bold">Create New Category</h1>
//         <button
//           onClick={() => router.back()}
//           className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
//         >
//           <ArrowLeftIcon className="h-5 w-5 mr-2" />
//           Back
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {errors.server && (
//           <div className="p-4 bg-red-100 text-red-700 rounded-lg dark:bg-red-900/30 dark:text-red-400">
//             {errors.server}
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Image Upload */}
//           <div className="space-y-4">
//             <label className="block text-sm font-medium dark:text-gray-300">
//               Category Image (Optional)
//             </label>
//             <div className="relative group">
//               <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                   id="imageUpload"
//                 />
//                 <label
//                   htmlFor="imageUpload"
//                   className="cursor-pointer flex flex-col items-center"
//                 >
//                   {previewImage ? (
//                     <>
//                       <img
//                         src={previewImage}
//                         alt="Preview"
//                         className="h-32 w-32 object-cover rounded-lg mb-4"
//                       />
//                       <span className="text-sm text-blue-600 dark:text-blue-400">
//                         Change Image
//                       </span>
//                     </>
//                   ) : (
//                     <>
//                       <PhotoIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto" />
//                       <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                         Click to upload an image
//                       </p>
//                     </>
//                   )}
//                 </label>
//               </div>
//               {previewImage && (
//                 <button
//                   type="button"
//                   onClick={removeImage}
//                   className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-1 rounded-full shadow-sm hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
//                 >
//                   <TrashIcon className="h-5 w-5" />
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Form Fields */}
//           <div className="space-y-6">
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-gray-300">
//                 Category Name *
//               </label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className={`w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700 ${
//                   errors.name ? 'border-red-500' : 'border-gray-200'
//                 }`}
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//               )}
//             </div>

//             {/* Slug */}
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-gray-300">
//                 Category Slug *
//               </label>
//               <input
//                 type="text"
//                 value={formData.slug}
//                 onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
//                 className={`w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700 ${
//                   errors.slug ? 'border-red-500' : 'border-gray-200'
//                 }`}
//               />
//               {errors.slug && (
//                 <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
//               )}
//             </div>

//             {/* Parent Category */}
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-gray-300">
//                 Parent Category
//               </label>
//               <select
//                 value={formData.parentCategory || ''}
//                 onChange={(e) => setFormData({ 
//                   ...formData, 
//                   parentCategory: e.target.value || null 
//                 })}
//                 className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
//               >
//                 <option value="">None (Top-level Category)</option>
//                 {categories.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Status */}
//             <div>
//               <label className="block text-sm font-medium mb-2 dark:text-gray-300">
//                 Status
//               </label>
//               <select
//                 value={formData.status}
//                 onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                 className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
//               >
//                 <option value="active">Active</option>
//                 <option value="archived">Archived</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium mb-2 dark:text-gray-300">
//             Description
//           </label>
//           <textarea
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700"
//             rows="4"
//           />
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end gap-4 border-t pt-6">
//           <button
//             type="button"
//             onClick={() => router.push('/categories')}
//             className="px-6 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center disabled:opacity-50"
//           >
//             {loading ? (
//               <>
//                 <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//                 </svg>
//                 Saving...
//               </>
//             ) : (
//               'Create Category'
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// app/categories/new/page.js
'use client';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { TreeSelect } from '@/components/TreeSelect';
import { useEffect } from 'react';
import { FileUpload } from '@/components/FileUpload';

export default function NewCategoryForm() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

  const categories = [
    {
        "_id": "67b4ee1f249ac6fb406490c1",
        "name": "Electronics",
        "slug": "electronics",
        "description": "The category will contain all of the electronics products",
        "parent": null,
        "children": [],
        "path": "",
        "isActive": false,
        "order": 0,
        "createdAt": "2025-02-18T20:31:27.208Z",
        "updatedAt": "2025-02-19T01:50:44.133Z",
        "__v": 0,
        "isDeleted": false
    },
    {
        "isDeleted": false,
        "_id": "67b4ee44249ac6fb406490c7",
        "name": "Electronics",
        "slug": "electronics-1",
        "description": "The category will contain all of the electronics products",
        "parent": {
            "_id": "67b4ee1f249ac6fb406490c1",
            "name": "Electronics",
            "slug": "electronics"
        },
        "children": [],
        "path": "67b4ee1f249ac6fb406490c1",
        "isActive": true,
        "order": 0,
        "createdAt": "2025-02-18T20:32:04.615Z",
        "updatedAt": "2025-02-18T20:32:04.615Z",
        "__v": 0
    },
    {
        "isDeleted": false,
        "_id": "67b4ee5e249ac6fb406490cd",
        "name": "Mobiles",
        "slug": "mobiles",
        "description": "The category will contain all of the electronics products",
        "parent": {
            "_id": "67b4ee1f249ac6fb406490c1",
            "name": "Electronics",
            "slug": "electronics"
        },
        "children": [],
        "path": "67b4ee1f249ac6fb406490c1",
        "isActive": true,
        "order": 0,
        "createdAt": "2025-02-18T20:32:30.343Z",
        "updatedAt": "2025-02-18T20:32:30.343Z",
        "__v": 0
    },
    {
        "isDeleted": false,
        "_id": "67b4ee7b249ac6fb406490d3",
        "name": "Samsung",
        "slug": "samsung",
        "description": "The category will contain all of the electronics products",
        "parent": {
            "_id": "67b4ee5e249ac6fb406490cd",
            "name": "Mobiles",
            "slug": "mobiles"
        },
        "children": [],
        "path": "67b4ee1f249ac6fb406490c1/67b4ee5e249ac6fb406490cd",
        "isActive": true,
        "order": 0,
        "createdAt": "2025-02-18T20:32:59.036Z",
        "updatedAt": "2025-02-18T20:32:59.036Z",
        "__v": 0
    },
    {
        "isDeleted": false,
        "_id": "67b4f3b7d9cb142abfc1eb69",
        "name": "Home & Chitcen",
        "slug": "home-and-chitcen",
        "description": "The category will contain all of the Home & Chitcen accesoris",
        "parent": null,
        "children": [
            {
                "_id": "67b4f3fad9cb142abfc1eb71",
                "name": "Bedroom",
                "slug": "bedroom"
            }
        ],
        "path": "",
        "isActive": true,
        "order": 0,
        "createdAt": "2025-02-18T20:55:19.299Z",
        "updatedAt": "2025-02-18T20:56:26.480Z",
        "__v": 0
    },
    {
        "isDeleted": false,
        "_id": "67b4f3fad9cb142abfc1eb71",
        "name": "Bedroom",
        "slug": "bedroom",
        "description": "The category will contain all of the Home & Chitcen accesoris",
        "parent": {
            "_id": "67b4f3b7d9cb142abfc1eb69",
            "name": "Home & Chitcen",
            "slug": "home-and-chitcen"
        },
        "children": [],
        "path": "67b4f3b7d9cb142abfc1eb69",
        "isActive": true,
        "order": 0,
        "createdAt": "2025-02-18T20:56:26.191Z",
        "updatedAt": "2025-02-18T21:32:12.041Z",
        "__v": 0
    },
    {
        "_id": "67b4f426d9cb142abfc1eb7c",
        "name": "Reading Table",
        "slug": "reading-table",
        "description": "The category will contain all of the Home & Chitcen accesoris",
        "parent": {
            "_id": "67b4f3fad9cb142abfc1eb71",
            "name": "Bedroom",
            "slug": "bedroom"
        },
        "children": [],
        "path": "67b4f3b7d9cb142abfc1eb69/67b4f3fad9cb142abfc1eb71",
        "isActive": true,
        "order": 0,
        "createdAt": "2025-02-18T20:57:10.789Z",
        "updatedAt": "2025-02-18T21:32:11.451Z",
        "__v": 0,
        "isDeleted": true
    },
    {
        "_id": "67b524c55a4906d4552e0be1",
        "name": "Clothing",
        "slug": "clothing",
        "description": "The category will contain all of the Clothing",
        "parent": null,
        "children": [
            {
                "_id": "67b524de5a4906d4552e0be6",
                "name": "Women",
                "slug": "women"
            },
            {
                "_id": "67b524e95a4906d4552e0bed",
                "name": "Men",
                "slug": "men"
            },
            {
                "_id": "67b524f55a4906d4552e0bf4",
                "name": "Children",
                "slug": "children"
            }
        ],
        "path": "",
        "isActive": true,
        "isDeleted": false,
        "order": 0,
        "createdAt": "2025-02-19T00:24:37.083Z",
        "updatedAt": "2025-02-19T00:25:25.752Z",
        "__v": 0
    },
    {
        "_id": "67b524de5a4906d4552e0be6",
        "name": "Women",
        "slug": "women",
        "description": "The category will contain all of the Clothing",
        "parent": {
            "_id": "67b524c55a4906d4552e0be1",
            "name": "Clothing",
            "slug": "clothing"
        },
        "children": [],
        "path": "67b524c55a4906d4552e0be1",
        "isActive": true,
        "isDeleted": false,
        "order": 0,
        "createdAt": "2025-02-19T00:25:02.302Z",
        "updatedAt": "2025-02-19T00:25:02.302Z",
        "__v": 0
    },
    {
        "_id": "67b524e95a4906d4552e0bed",
        "name": "Men",
        "slug": "men",
        "description": "The category will contain all of the Clothing",
        "parent": {
            "_id": "67b524c55a4906d4552e0be1",
            "name": "Clothing",
            "slug": "clothing"
        },
        "children": [],
        "path": "67b524c55a4906d4552e0be1",
        "isActive": true,
        "isDeleted": false,
        "order": 0,
        "createdAt": "2025-02-19T00:25:13.569Z",
        "updatedAt": "2025-02-19T00:25:13.569Z",
        "__v": 0
    }
]

  // Auto-generate slug from name
  const name = watch('name');
  useEffect(() => {
    if (name) {
      const generatedSlug = name
        .toLowerCase()
        // Replace spaces and special characters with dashes
        .replace(/[^a-zA-Z0-9\s]/g, '-')  // First replace special chars with -
        .replace(/\s+/g, '-')             // Then replace spaces with -
        // Clean up multiple dashes
        .replace(/-+/g, '-')              // Replace multiple - with single -
        // Remove leading/trailing dashes
        .replace(/^-+/, '')
        .replace(/-+$/, '');
  
      setValue('slug', generatedSlug);
    }
  }, [name, setValue]);

  const onSubmit = async (data) => {
    // Handle form submission
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-6">Create New Category</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Category Name *</Label>
            <Input
              id="name"
              {...register('name', { required: true })}
              className="mt-2"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
          </div>

          <div>
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              {...register('slug', { required: true })}
              className="mt-2"
              readOnly
            />
          </div>
        </div>

        {/* Parent Category Selection */}
        <div>
          <Label>Parent Category</Label>
          <TreeSelect
            options={buildCategoryTree(categories)}
            onChange={(value) => setValue('parent', value)}
            className="mt-2"
            placeholder="Select parent category"
            maxDepth={4} // Enforces 5-level hierarchy
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description')}
            className="mt-2"
            maxLength={500}
          />
          <div className="text-sm text-gray-500 mt-1">
            {watch('description')?.length || 0}/500 characters
          </div>
        </div>

        {/* Status & Image Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Status</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Switch
                id="isActive"
                {...register('isActive')}
                defaultChecked
              />
              <Label htmlFor="isActive">
                {watch('isActive') ? 'Active' : 'Inactive'}
              </Label>
            </div>
          </div>

          <div>
            <Label>Category Image</Label>
            <FileUpload
              onFileUpload={(url) => setValue('image', url)}
              className="mt-2"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <Button type="submit" className="w-full md:w-auto">
            Create Category
          </Button>
        </div>
      </form>
    </div>
  );
}

// Helper function to build category tree
const buildCategoryTree = (categories, parentId = null, level = 0) => {
  return categories
    .filter(cat => cat.parent?.toString() === parentId?.toString())
    .map(cat => ({
      value: cat._id,
      label: `${'— '.repeat(level)} ${cat.name}`,
      children: buildCategoryTree(categories, cat._id, level + 1)
    }));
};