rails generate คล้าย nest generate

```
nest                         Rails
generate controller users    rails g controller users

nest g module auth           rails g model User

nest g service auth          rails g service

nest g resource users        scaffold

scaffold ใน Rails คือ generator แบบ “สร้าง CRUD ครบชุด” อัตโนมัติครับ
nest g resource users       rails g scaffold users

```

## CRUD

### create model

```
rails g model User name:string

## check model
db/migrate/...
```

### migration

```
rails db:migrate
## note มันจะไปสร้าง table ตามที่กำหนดใน model
```

------------------ controller ------------------

```
rails g controller api/v1/users

# ยังไม่รองรับการสร้าง controller แบบ nested ได้ ต้องสร้าง manually
mkdir -p app/domains/users/controllers/api/v1

mv app/controllers/api/v1/users_controller.rb app/domains/users/controllers/api/v1/users_controller.rb
```

------------------ service ------------------

```ruby
mkdir -p app/domains/users/services
touch app/domains/users/services/service.rb
module Users

  module Services

    class GetUsers

      def self.call

        Users::User.all

      end

    end

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
## Controller
class Api::V1::UsersController < ApplicationController

  def get_user

    user = Users::Services::Services.get_user(params[:id])

    render json: user

  end

end


## Route

namespace :api do
  namespace :v1 do
    get "users/:id", to: "users#get_user"
  end
end
```

---------------- route ----------------

```ruby
mkdir -p app/domains/users/routes
touch app/domains/users/routes/routes.rb

Rails.application.routes.draw do

  namespace :api do

    namespace :v1 do

      resources :users

    end

  end

end
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
