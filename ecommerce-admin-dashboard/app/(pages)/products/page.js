"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import ProductList from "../../../components/products/ProductList";
import ProductFilters from "../../../components/products/ProductFilters";
import Pagination from "../../../components/Pagination";
import PageHeader from "@/components/PageHeader";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function ProductsPage({ searchParamsPromise }) {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session?.accessToken) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const searchParams = await searchParamsPromise;
        const query = new URLSearchParams(
          Object.fromEntries(
            Object.entries(searchParams || {}).map(([key, value]) => [key, String(value)])
          )
        ).toString();

        const res = await axios.get(
          `https://8080-mazedul956-ecommercesol-vh0txgc5lvq.ws-us117.gitpod.io/api/product/get-product?${query}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        console.log(res.data)

        setProducts(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [session, searchParamsPromise]); // Runs when session or searchParams change

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <PageHeader title="Products Management" actionHref="/products/new" actionText="New Product" Icon={PlusIcon} />
      <ProductFilters />
      <ProductList products={products?.data || []} />
      <Pagination currentPage={products?.pagination?.page} totalPages={products?.pagination?.totalPages} />
    </div>
  );
}
