// "use client"
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import React from "react";

const NewHeader = ({ status, setStatus, session, productData, validateForm}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productData)
    if (!validateForm()) return;
    
    // Submit logic here
    try {
      const response = await axios.post(`https://8080-mazedul956-ecommercesol-vh0txgc5lvq.ws-us117.gitpod.io/api/product/upload-product`, productData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`, // Send token in header
        },
        
      })

      console.log(response.data)

      // router.push('/products');
    } catch (error) {
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        console.error("Status code:", error.response.status);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      // setErrors({ submit: "Failed to create product. Try again later." });
    } finally {
      // setLoading(false);
    }
    // console.log(newProduct)
    // router.push('/products');
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
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {status === "draft" ? "Save Draft" : "Publish Product"}
        </button>
      </div>
    </div>
  );
};

export default NewHeader;
