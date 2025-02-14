import axios from "axios";
import { getSession, useSession } from "next-auth/react";

export const getAllProducts = async (searchParamsPromise) => {
  const session = await getSession();
  console.log("token", session?.accessToken)
  if (!session || !session.accessToken) {
    throw new Error("Unauthorized: No session or token found");
  }
  try {
    const searchParams = await searchParamsPromise;
    const query = new URLSearchParams(
      Object.fromEntries(
        Object.entries(searchParams).map(([key, value]) => [key, String(value)])
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

    console.log(res)

    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(error.message);
  }
};

export async function getProductDetails(productId) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/product/product-details/${productId}`,
      {
        cache: "no-store", // Ensures fresh data
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null; // Return null instead of crashing
  }
}
