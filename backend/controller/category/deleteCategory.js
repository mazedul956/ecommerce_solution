const Category = require('../../models/categoryModel');

// Delete a category (soft delete)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    if (category.isDeleted) {
      return res.status(400).json({ message: 'Category is already deleted.' });
    }

    const softDeleteCategory = async (categoryId) => {
      const categoryToDelete = await Category.findById(categoryId);
      if (!categoryToDelete) return;

      categoryToDelete.isDeleted = true;
      await categoryToDelete.save();

      // Recursively soft delete all children
      for (const childId of categoryToDelete.children) {
        await softDeleteCategory(childId);
      }
    };

    // Start the soft deletion process
    await softDeleteCategory(id);

    // Remove the category from its parent's children array
    if (category.parent) {
      await Category.findByIdAndUpdate(
        category.parent,
        { $pull: { children: id } },
        { new: true }
      );
    }

    // Return success response
    res.status(200).json({
      message: 'Category and its children deleted successfully.',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

module.exports = deleteCategory