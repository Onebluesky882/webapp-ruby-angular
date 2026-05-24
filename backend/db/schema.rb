# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_05_24_075134) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pgcrypto"

  create_table "carts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.jsonb "items"
    t.integer "qty"
    t.string "status"
    t.integer "total"
    t.datetime "updated_at", null: false
    t.uuid "user_id"
  end

  create_table "products", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "category"
    t.datetime "created_at", null: false
    t.text "description"
    t.string "image"
    t.string "name"
    t.integer "price_cents"
    t.jsonb "rating"
    t.integer "stock"
    t.string "sub_category"
    t.datetime "updated_at", null: false
  end
end
