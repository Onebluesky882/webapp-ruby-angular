rails generate คล้าย nest generate

```
nest                         Rails
nest g module auth           rails g model User

generate controller users    rails g controller users


nest g service auth          rails g service

nest g resource users        scaffold

scaffold ใน Rails คือ generator แบบ “สร้าง CRUD ครบชุด” อัตโนมัติครับ
nest g resource users       rails g scaffold users

```

## CRUD

## ลบ table

terminal: rails g migration DropUsers

### create model

## เพิ่ม uuid primary key

setting ที่ไฟล์ application.rb เพิ่ม code ดังนี้

```ruby
config.generators do |g|
  g.orm :active_record, primary_key_type: :uuid
end
```

terminal: rails g migration EnablePgcryptoExtension

```ruby
class EnablePgcryptoExtension < ActiveRecord::Migration[8.1]

  def change

    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')

  end

end

```

next step

terminal: rails g migration CreateUsers

```ruby
class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users, id: :uuid do |t|
      t.string :name
      t.string :email
      t.string :job

      t.timestamps
    end
  end
end
```

terminal: rails db:migrate

### migration

```
rails db:migrate
## note มันจะไปสร้าง table ตามที่กำหนดใน model
```

ตรวจสอบ ดูใน schema.rb

test : test create user
terminal: rails console

```ruby
User.create(name: "John", email: "john@example.com", job: "Developer")
```

------------------ service ------------------

```ruby
mkdir -p app/services
touch app/services/user_service.rb
module UserService
  def self.create_user(name, email, job)
    User.create(name: name, email: email, job: job)
  end

  def self.get_all_users
    User.all
  end

  def self.get_user_by_id(id)
    User.find(id)
  end

  def self.update_user(id, name, email, job)
    User.find(id).update(name: name, email: email, job: job)
  end

  def self.delete_user(id)
    User.find(id).destroy
  end
end
```

Rails method name ไม่จำเป็นต้องเป็น show เสมอ
คุณสามารถตั้งชื่ออะไรก็ได้ เช่น:

!!! แต่ต้อง map route เอง

เพราะ Rails default RESTful routes จะมองหา:

```
Route                       Method
GET /users                  index
GET /users/:id              show
GET /users/:id/edit         edit
PUT /users/:id              update
DELETE /users/:id           destroy

```

### ถ้าใช้ชื่อ custom

```ruby

def get_user

user = Users::Services::Services.get_user(params[:id])

render json: user

end
```

### ต้องเพิ่ม route เอง

```ruby
get "/users/:id", to: "users#get_user"
```

#### ตัวอย่างเต็ม

```ruby





------------------ controller ------------------

```

rails g controller api/v1/users

\*\* query_params คือ params ที่ส่งมาผ่าน query string
user = UserService.get_user(params[:id])

\*\* params คือ params ที่ส่งมาผ่าน path
user = UserService.get_user(params[:id])

Route Method
GET /users index
GET /users/:id show
GET /users/:id/edit edit (optional) edit form
PUT /users/:id update
DELETE /users/:id destroy

ข้อสังเกต: DTO (Data Transfer Object) คือ object ที่ใช้ส่งข้อมูลระหว่าง layer

```ruby
 def create
    dto = Users::Dtos::CreateUserDto.new(user_params)
    if dto.valid?
      user = UserService.create_user(dto.attributes)
      render json: user, status: :created
    else
      render json: { errors: dto.errors }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
```

ทำไมไม่เอา user_params ไปใส่ใน dto

user_params = HTTP layer (Controller responsibility)
dto = Business logic layer (Service/Model responsibility)

---------------- Dto ----------------
!! setup auto load path

add to config/application.rb

```ruby
config.autoload_paths << Rails.root.join("app/domains")
config.eager_load_paths << Rails.root.join("app/domains")
```

terminal: mkdir -p app/dtos

```ruby
module Users
  module Dtos
    class CreateUserDto

      include ActiveModel::Model

      attr_accessor :name, :email

      validates :name, presence: true

      validates :email, presence: true

      def attributes

        {

          name: name,

          email: email

        }

      end
    end
  end
end
```

---------------- route ----------------

```ruby
# เปิดไฟล์ routes หลัก
config/routes.rb

Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resources :users
    end
  end
end

ตรวจสอบ route ที่สร้างขึ้นมา
rails routes | grep users


9. check api command
rails zeitwerk:check

```

### global route

config/routes.rb

```ruby
 Rails.application.routes.draw do

  Dir[Rails.root.join('app/domains/**/routes/*.rb')].each do |route|

    instance_eval(File.read(route))

  end

end
```

check api command
rails zeitwerk:check
