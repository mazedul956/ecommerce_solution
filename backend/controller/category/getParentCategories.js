const Category = require('../../models/categoryModel'); // Import your Category model

// Get all categories that can be parents (including middle categories)
const getParentCategories = async (req, res) => {
  try {
    // Fetch categories that are not soft-deleted
    const parentCategories = await Category.find(
      { isDeleted: false }, // Filter condition
      { _id: 1, name: 1, path: 1 } // Projection: include _id, name, and path
    );

    // Return the parent categories
    res.status(200).json({
      message: 'Parent categories retrieved successfully.',
      data: parentCategories,
    });
  } catch (error) {
    console.error('Error fetching parent categories:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

module.exports = getParentCategories