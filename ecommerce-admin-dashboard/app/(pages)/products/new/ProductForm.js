import React from 'react'
import {
    PhotoIcon,
    TrashIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
const categories = ["Electronics", "Fashion", "Home & Kitchen", "Books"];
const brands = ["Apple", "Samsung", "Nike", "Sony"];

const ProductForm = ({
    activeSection, 
    errors, 
    tempTag, 
    setTempTag, 
    productData, 
    setProductData,
    handleImageChange, 
    handleRemoveImage, 
    handleUploadImages, 
    handleAddTag,
    removeTag,
    handleAddVariant
}) => {
  return (
    <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm dark:shadow-gray-900 transition-colors">
          {activeSection === "basic" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium">Product Title *</label>
                  <input
                    type="text"
                    value={productData.productName}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        productName: e.target.value,
                      })
                    }
                    className={`mt-1 block w-full rounded-lg border ${
                      errors.productName ? "border-red-500" : "border-gray-200"
                    } p-2`}
                  />
                  {errors.productName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.productName}
                    </p>
                  )}
              </div>

              <div>
                <label className="block text-sm font-medium">Description *</label>
                  <textarea
                    value={productData.description}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        description: e.target.value,
                      })
                    }
                    className={`mt-1 block w-full rounded-lg border ${
                      errors.description ? "border-red-500" : "border-gray-200"
                    } p-2 h-32`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Category *</label>
                    <select
                      value={productData.category}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          category: e.target.value,
                        })
                      }
                      className={`mt-1 block w-full rounded-lg border ${
                        errors.category ? "border-red-500" : "border-gray-200"
                      } p-2`}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Brand *</label>
                    <select
                      value={productData.brandName}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          brandName: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-200 p-2"
                    >
                      <option value="">Select Brand</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Tags</label>
                  <div className="mt-1 flex gap-2">
                    <input
                      type="text"
                      value={tempTag}
                      onChange={(e) => setTempTag(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                      className="flex-1 rounded-lg border border-gray-200 p-2"
                      placeholder="Add tags (press enter)"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {productData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
              </div>
            </div>
          )}

          {activeSection === "inventory" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">SKU *</label>
                    <input
                      type="text"
                      value={productData.sku}
                      onChange={(e) =>
                        setProductData({ ...productData, sku: e.target.value })
                      }
                      className={`mt-1 block w-full rounded-lg border ${
                        errors.sku ? "border-red-500" : "border-gray-200"
                      } p-2`}
                    />
                    {errors.sku && (
                      <p className="text-red-500 text-sm mt-1">{errors.sku}</p>
                    )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Stock *</label>
                    <input
                      type="number"
                      value={productData.stock}
                      onChange={(e) =>
                        setProductData({ ...productData, stock: Number(e.target.value) || 0 })
                      }
                      className={`mt-1 block w-full rounded-lg border ${
                        errors.stock ? "border-red-500" : "border-gray-200"
                      } p-2`}
                    />
                    {errors.stock && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.stock}
                      </p>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Price *</label>
                    <input
                      type="number"
                      value={productData.price}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          price: e.target.value,
                        })
                      }
                      className={`mt-1 block w-full rounded-lg border ${
                        errors.price ? "border-red-500" : "border-gray-200"
                      } p-2`}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.price}
                      </p>
                    )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Selling Price</label>
                    <input
                      type="number"
                      value={productData.sellingPrice}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          sellingPrice: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-200 p-2"
                    />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Discount (%)</label>
                    <input
                      type="number"
                      value={productData.discount}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          discount: Math.min(
                            100,
                            Math.max(0, parseFloat(e.target.value) || 0)
                          ),
                        })
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-200 p-2"
                    />
                </div>
                <div>
                  <label className="flex items-center space-x-2 mt-6">
                    <input
                      type="checkbox"
                      checked={productData.isFeatured}
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          isFeatured: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium">
                      Featured Product
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === "media" && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="mt-2 text-gray-600">
                    Drag and drop images or click to upload
                  </p>
                </label>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {productData.productImage.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Product ${index + 1}`}
                      className="rounded-lg h-32 w-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm hover:bg-red-100"
                    >
                      <TrashIcon className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleUploadImages}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                // disabled={loading}
              >
                Upload
              </button>
            </div>
          )}

          {/* {activeSection === "variants" && (
            <div className="space-y-6">
              <button
                onClick={handleAddVariant}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Variant Option
              </button>
              {productData.variants.map((variant, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Option Name (e.g., Size, Color)
                        <input
                          type="text"
                          value={variant.option}
                          onChange={(e) => {
                            const newVariants = [...productData.variants];
                            newVariants[index].option = e.target.value;
                            setProductData({
                              ...productData,
                              variants: newVariants,
                            });
                          }}
                          className="mt-1 block w-full rounded-lg border border-gray-200 p-2"
                        />
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Values (comma-separated)
                        <input
                          type="text"
                          value={variant.values}
                          onChange={(e) => {
                            const newVariants = [...productData.variants];
                            newVariants[index].values = e.target.value;
                            setProductData({
                              ...productData,
                              variants: newVariants,
                            });
                          }}
                          className="mt-1 block w-full rounded-lg border border-gray-200 p-2"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )} */}

          {/* {activeSection === "seo" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  SEO Title
                  <input
                    type="text"
                    value={productData.seoTitle}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        seoTitle: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-200 p-2"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  SEO Description
                  <textarea
                    value={productData.seoDescription}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        seoDescription: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-200 p-2 h-32"
                  />
                </label>
              </div>
            </div>
          )} */}
        </div>
  )
}

export default ProductForm