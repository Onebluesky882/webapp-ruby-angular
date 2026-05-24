class ProductService
  def self.get_products
    Product.all
  end
  
  def self.create_product(params)
    Product.create!(params)
  end
end