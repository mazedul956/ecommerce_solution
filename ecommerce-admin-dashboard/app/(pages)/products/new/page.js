// app/products/new/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import uploadImage from "@/utils/uploadImage";
import { useSession } from "next-auth/react";
import SideNavigation from "./SideNavigation";
import NewHeader from "./NewHeader";
import axios from "axios";
import ProductForm from "./ProductForm";

export default function CreateProduct() {
  const router = useRouter();
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: 0,
    sellingPrice: 0,
    stock: 0,
    sku: "",
    discount: 0,
    tags: [],
    isPublished: false,
    isFeatured: false
  });
  
  // const [productData, setProductData] = useState({
  //   productName: "",
  //   description: "",
  //   price: "",
  //   sellingPrice: "",
  //   costPerItem: "",
  //   sku: "",
  //   stock: 0,
  //   weight: "",
  //   status: "draft",
  //   variants: [],
  //   productImage: selectedImages,
  //   // seoTitle: "",
  //   // seoDescription: "",
  //   category: "",
  //   brandName: "",
  //   tags: [],
  //   isPublished: true,
  //   isFeatured: false,
  //   discount: 0,
  // });

  const [tempTag, setTempTag] = useState("");
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState("basic");

  const validateForm = () => {
    const newErrors = {};
    if (!productData.productName)
      newErrors.productName = "Product title is required";
    if (!productData.price) newErrors.price = "Price is required";
    if (!productData.sku) newErrors.sku = "SKU is required";
    if (productData.stock < 0) newErrors.stock = "Stock cannot be negative";
    // if (productData.productImage.length < 1) newErrors.productImage = 'At list one product image required';
    if (!productData.category) newErrors.category = "Category is required";
    if (status === "published" && !productData.description) {
      newErrors.description = "Description is required for publishing";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddVariant = () => {
    setProductData((prev) => ({
      ...prev,
      variants: [...prev.variants, { option: "", values: "" }],
    }));
  };
// Handle image selection
const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  setProductData((prev) => ({
    ...prev,
    productImage: [...prev.productImage, ...files], // Update productImage directly
  }));
};

// Remove selected image before upload
  const handleRemoveImage = (index) => {
    setProductData((prev) => ({
      ...prev,
      productImage: prev.productImage.filter((_, i) => i !== index), // Remove image by index
    }));
  };
 
  // Upload all selected images
  // Upload all selected images
const handleUploadImages = async () => {
  try {
    const uploaded = await Promise.all(
      productData.productImage.map((image) => uploadImage(image))
    );

    setProductData((prev) => ({
      ...prev,
      productImage: uploaded.map((img) => img.secure_url), // Store uploaded URLs
    }));
  } catch (error) {
    console.error("Image upload failed:", error);
  }
};

  const handleDeleteImage = async (publicId, deleteToken) => {
    try {
      // 3. Make the delete request
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/majedul/image/destroy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            public_id: publicId,
            token: deleteToken,
          }),
          credentials: "include",
        }
      );

      // 4. Handle the response
      const result = await response.json();

      console.log(result);

      if (result.result !== "ok") {
        throw new Error("Failed to delete image from Cloudinary");
      }

      // 5. Update local state after successful deletion
      setProductData((prev) => ({
        ...prev,
        productImage: prev.productImage.filter(
          (image) => image.public_id !== publicId
        ),
      }));
    } catch (error) {
      console.error("Delete error:", error);
      // Handle errors in your UI here
    }
  };

  const handleAddTag = () => {
    if (tempTag.trim() && !productData.tags.includes(tempTag.trim())) {
      setProductData((prev) => ({
        ...prev,
        tags: [...prev.tags, tempTag.trim()],
      }));
      setTempTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setProductData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = () => {}

  const { data: session } = useSession();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <NewHeader
        status={status}
        setStatus={setStatus}
        session={session}
        productData={productData}
        validateForm={validateForm}
      />

      {/* Form Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <SideNavigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Form Content */}
        <ProductForm 
          activeSection={activeSection}
          errors={errors}
          setErrors={setErrors}
          tempTag={tempTag}
          setTempTag={setTempTag}
          productData={productData}
          setProductData={setProductData}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
          handleUploadImages={handleUploadImages}
          handleAddTag={handleAddTag}
          removeTag={removeTag}
          handleAddVariant={handleAddVariant}
        />
      </div>
    </div>
  );
}