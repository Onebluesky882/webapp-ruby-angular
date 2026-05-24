class CartService
  def self.get_cart(user_id)
    Cart.where(user_id: user_id, status: 'onCart')
  end
  def self.create_cart(user_id)
    Cart.create!(user_id: user_id, status: 'onCart')
  end
  def self.update_cart(cart_id, params)
    Cart.find(cart_id).update(params)
  end
  def self.delete_cart(cart_id)
    Cart.find(cart_id).destroy
  end

  # Add product to cart
  def self.add_to_cart(user_id, product_id, qty)
    # get cart
    cart = get_cart(user_id)
    
    # get product
    product = Product.find(product_id)
    
    # add product to cart
    existing = cart.find{ |i| i["product_id"] == product_id }
    if existing
      existing["qty"]  += qty
    else
       item << {
        product_id: product_id,
        name: product.name,
        price: product.price_cents,
        qty: qty
       }
    end

  end


end