const Order = require('../../models/order');

module.exports = {
  cart,
  addToCart,
  removeFromCart,
  setItemQtyInCart,
  checkout,
  history,
  deleteOder
};

// A cart is the unpaid order for a user
async function cart(req, res) {
  try{
    console.log("cart",req.user);
    const cart = await Order.getCart(req.user._id);

    console.log("actual Cart",cart.lineItems.length)
    res.status(200).json(cart);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }
}

// Add an item to the cart
async function addToCart(req, res) {
  console.log("Addtocart");
  try{
    const cart = await Order.getCart(req.user._id);
    await cart.addItemToCart(req.params.id);
    res.status(200).json(cart);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }  
}
async function removeFromCart(req, res) {
  console.log("removeFromCart");
  try{
    const cart = await Order.getCart(req.user._id);
    await cart.deleteItemFromCart(req.params.id);
    res.status(200).json(cart);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }  
}

// Updates an item's qty in the cart
async function setItemQtyInCart(req, res) {
  console.log("=============setItemQtyInCart", req.body);
  try{
    const cart = await Order.getCart(req.user._id);
    await cart.setItemQty(req.body.itemId, req.body.newQty);
    res.status(200).json(cart);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }
}

// Update the cart's isPaid property to true
async function checkout(req, res) {
  try{
    const cart = await Order.getCart(req.user._id);
    cart.isPaid = true;
    await cart.save();
    res.status(200).json(cart);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }  
}

// Return the logged in user's paid order history
async function history(req, res) {
  // Sort most recent orders first
  console.log("history", req.user._id);
  try{
    const orders = await Order
      .find({ user: req.user._id, isPaid: true })
      .sort('-updatedAt').exec();
    res.status(200).json(orders);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }

}

async function deleteOder(req, res) {
  // Sort most recent orders first
  console.log("deleteOder", req.user._id, req.params.id);
  try{
    const orders = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(orders);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }

}