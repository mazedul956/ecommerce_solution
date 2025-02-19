// app/categories/CategoriesTable.js
'use client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Folder, Edit, Trash } from 'lucide-react';
import Link from 'next/link';

export default function CategoriesTable({ categories, selectedCategories, toggleSelectCategory, onDeleteClick }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Parent Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell>
                <Checkbox
                  checked={selectedCategories.includes(category._id)}
                  onCheckedChange={() => toggleSelectCategory(category._id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4" />
                  <span>{category.name}</span>
                </div>
              </TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>{category.parent?.name || '–'}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/categories/${category._id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      toggleSelectCategory(category._id); // Select the category
                      onDeleteClick(); // Open the delete modal
                    }}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}