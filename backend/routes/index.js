const express = require('express')

const router = express.Router()

const authToken = require('../middleware/authToken')
const { uploadProduct, updateProduct, searchProduct, singleProductDetails, getAllProducts, getCategoryWiseProducts, getProductsByCategory, filterProduct} = require("../controller/product")
const {createOrder, deleteOrder, getOrderById, getOrdersByAdmin, getOrdersByUser, updateOrderStatus} = require('../controller/order')
const { addToCart, viewCart, deleteCartProduct } = require('../controller/cart')
const {allUsers, updateUser, userDetails, logoutUser, userSignIn, userSignUp} = require("../controller/user")

// users routes
router.post("/signup",userSignUp)
router.post("/signin",userSignIn)
router.get("/user-details",authToken,userDetails)
router.post("/userLogout",logoutUser)

//admin panel routes
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product routes
router.post("/product/upload-product",authToken,uploadProduct)
router.get("/product/get-product", authToken, getAllProducts)
router.patch("/product/update-product/:productId",authToken,updateProduct)
router.get("/product/get-categoryProduct",getProductsByCategory)
router.post("/product/category-product",getCategoryWiseProducts)
router.get("/product/product-details/:productId",singleProductDetails)
router.get("/product/search",searchProduct)
router.post("/product/filter-product",filterProduct)

//cart routes
router.post("/cart/addtocart",authToken, addToCart)
router.get("/cart/view-cart",authToken, viewCart)
router.delete("/cart/delete-cart-product/:productId", authToken, deleteCartProduct)

//order routes
router.post("/order/create-order",authToken, createOrder)
router.delete("/order/delete-order/:orderId",authToken, deleteOrder)
router.patch("/order/update-order-status/:orderId",authToken, updateOrderStatus)
router.get("/order/orderbyid/:orderId",authToken, getOrderById)
router.get("/order/allordersbyadmin",authToken, getOrdersByAdmin)
router.get("/order/allordersbyuser",authToken, getOrdersByUser)



module.exports = router