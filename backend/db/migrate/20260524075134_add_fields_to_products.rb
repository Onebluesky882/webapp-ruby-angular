class AddFieldsToProducts < ActiveRecord::Migration[8.1]
  def change
    add_column :products, :rating, :jsonb
    add_column :products, :category, :string
    add_column :products, :sub_category, :string
  end
end
