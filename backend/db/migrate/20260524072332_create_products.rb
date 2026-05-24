class CreateProducts < ActiveRecord::Migration[8.1]
  def change
    create_table :products, id: :uuid do |t|
      t.string :name
      t.integer :price_cents
      t.string :image
      t.integer :stock
      t.text :description

      t.timestamps
    end
  end
end
