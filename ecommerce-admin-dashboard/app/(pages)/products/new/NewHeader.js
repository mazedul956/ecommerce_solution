"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { createNewProduct } from "@/lib/productAction";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const NewHeader = ({ status, setStatus, session, productData, validateForm}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); 

    const products = await createNewProduct(productData, session?.accessToken)

    setLoading(false); 
    
    if(products?.success) {
      router.push("/products");
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <Link
        href="/products"
        className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Products
      </Link>
      <div className="flex gap-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg bg-white"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button
          onClick={handleSubmit}
          disabled={loading} 
          className={`px-6 py-2 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {status === "draft" ? "Save Draft" : "Publish Product"}
        </button>
      </div>
    </div>
  );
};

export default NewHeader;
