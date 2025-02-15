// app/products/new/page.js
"use client";
import { useState } from "react";
import uploadImage from "@/utils/uploadImage";
import { useSession } from "next-auth/react";
import ProductCreateUpdateHeader from "@/components/products/ProductCreateUpdateHeader";
import ProductForm from "../../../../../components/products/ProductForm";
import SideNavigation from "../../../../../components/products/SideNavigation";

export default function EditProduct() {
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
  
  const [tempTag, setTempTag] = useState("");
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState("basic");
  const [loadingImgUpload, setLoadingImgUpload] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!productData.productName)
      newErrors.productName = "Product title is required";
    if (!productData.price) newErrors.price = "Price is required";
    if (!productData.sku) newErrors.sku = "SKU is required";
    if (productData.stock < 0) newErrors.stock = "Stock cannot be negative";
    if (!productData.category) newErrors.category = "Category is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddVariant = () => {
    setProductData((prev) => ({
      ...prev,
      variants: [...prev.variants, { option: "", values: "" }],
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
const handleUploadImages = async () => {
  try {
    setLoadingImgUpload(true)
    const uploaded = await Promise.all(
      productData.productImage.map((image) => uploadImage(image))
    );

    setProductData((prev) => ({
      ...prev,
      productImage: uploaded.map((img) => img.secure_url), // Store uploaded URLs
    }));

    setLoadingImgUpload(false)
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

  const { data: session } = useSession();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <ProductCreateUpdateHeader
        session={session}
        productData={productData}
        validateForm={validateForm}
        isEditPage={true}
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
          handleRemoveImage={handleRemoveImage}
          handleUploadImages={handleUploadImages}
          loadingImgUpload={loadingImgUpload}
          handleAddTag={handleAddTag}
          removeTag={removeTag}
          handleAddVariant={handleAddVariant}
        />
      </div>
    </div>
  );
}