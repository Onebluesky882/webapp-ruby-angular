## install

rails new backend --api -d postgresql

## create database

setup database.yml

```yaml
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS", 5) %>
  url: <%= ENV["DATABASE_URL"] %>
  schema_search_path: public

development:
  <<: *default

test:
  <<: *default

production:
  <<: *default
```

terminal

```bash

ติดตั้ง package dotenv
gem 'dotenv-rails' ใน Gemfile
run `bundle install`
เพิ่ม .env ด้วย DATABASE_URL="postgresql://postgres:password@kodama.proxy.rlwy.net:33203/railway"
```

add variable config/master.key to server host

rails db:create

next step

## STEP: Setup UUID Primary Key ใน Rails

rails g migration enable_pgcrypto

```ruby
class EnablePgcrypto < ActiveRecord::Migration[8.1]
  def change
    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')
  end
end
```

```bash
rails db:migrate
```

## เริ่มต้น starter project

```bash
rails db:reset
rails db:migrate
```

## create model cart

```bash
rails g model Cart user:uuid status:string qty:integer total:integer items:jsonb
```

อย่าลืม แก้ แก้ Migration ให้ใช้ UUID
file : db/migrate/xxxx_create_products.rb

```ruby
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
```

## สร้าง table ใน database ตาม model

```bash
rails db:migrate
```

## type safety

เพิ่ม ใน Gemfile

````ruby
group :development do

  gem "rbs"

  gem "steep"

end
```

```bash
bundle install
bundle exec rbs collection init
bundle exec rbs collection install
```
install RBS types (สำคัญ)
```bash
bundle exec rbs collection install
```
generate RBS signatures
```bash
bundle exec steep gen
```

generate RBS signatures for cart model
```bash
mkdir sig
bundle exec rbs prototype rb app/models/cart.rb > sig/cart.rbs
```

## สร้าง service cart
```
````
