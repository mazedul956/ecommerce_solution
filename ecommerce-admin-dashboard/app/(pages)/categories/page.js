// app/categories/page.js
import axios from 'axios';
import CategoriesPageWrapper from './CategoriesPageWrapper';
import Filters from './Filters';

async function getCategories(searchParamsPromise) {
  try {
    const searchParams = await searchParamsPromise;
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries(searchParams).map(([key, value]) => [key, String(value)])
      )
    ).toString();

    const res = await axios.get(`${process.env.BACKEND_URL}/api/category?${query}`);

    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(error.message);
  }
}

export default async function CategoriesPage({ searchParams }) {
  const { data: categories, pagination } = await getCategories(searchParams);

  const filterOptions = [
    { key: "search", type: "text", placeholder: "Search categories..." },
    { key: "isActive", type: "select", placeholder: "Status", options: [
        { value: "all", label: "All" },
        { value: "true", label: "Active" },
        { value: "false", label: "Inactive" },
      ]
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Categories Management</h1>
      <Filters entity="categories" filterOptions={filterOptions} existingFilters={searchParams} />
      <CategoriesPageWrapper
        categories={categories}
        pagination={pagination}
        currentPage={pagination?.page}
        filters={searchParams}
      />
    </div>
  );
}