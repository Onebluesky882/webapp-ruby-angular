class CreateCarts < ActiveRecord::Migration[8.1]
  def change
    create_table :carts, id: :uuid do |t|
      t.uuid :user_id
      t.string :status
      t.integer :qty
      t.integer :total
      t.jsonb :items

      t.timestamps
    end
  end
end
