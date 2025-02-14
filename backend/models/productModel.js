const productSchema = new mongoose.Schema(
    {
      productName: {
        type: String,
        trim: true,
        minlength: [3, 'Product name must be at least 3 characters long'],
        maxlength: [100, 'Product name cannot exceed 100 characters'],
      },
      brandName: {
        type: String,
        required: [true, 'Brand name is required'],
        trim: true,
      },
      category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
      },
      productImage: {
        type: [String],
        validate: {
          validator: function (value) {
            return value.every((url) => /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(url));
          },
          message: 'Each product image must be a valid URL ending with jpg, jpeg, png, gif, or webp.',
        },
        default: [],
      },
      description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters'],
      },
      price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
      },
      sellingPrice: {
        type: Number,
      },
      stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0,
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      min: [2, 'Minimum sku length should be 2'],
    },
      discount: {
        type: Number,
        min: [0, 'Discount cannot be negative'],
        max: [100, 'Discount cannot exceed 100%'],
        default: 0,
      },
      ratings: {
        type: Number,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot exceed 5'],
        default: 0,
      },
      numberOfReviews: {
        type: Number,
        default: 0,
      },
      tags: {
        type: [String],
        default: [],
      },
      isPublished: {
        type: Boolean,
        default: false,
      },
      isFeatured: {
        type: Boolean,
        default: false,
    },
      updatedBy: {
        type: String
      }
    },
    {
      timestamps: true,
    }
  );
  
const productModel = mongoose.model("Product",productSchema)

module.exports = productModel