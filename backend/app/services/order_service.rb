class OrderService
  def self.get_order(user_id)
    Order.find_by(user_id: user_id, status: 'paid')
  end
  def self.create_order(user_id)
    Order.create(user_id: user_id, status: 'paid')
  end
  def self.update_order(order_id, order_data)
    Cart.find(cart_id).update(cart_data)
  end
  def self.delete_cart(cart_id)
    Cart.find(cart_id).destroy
  end
end