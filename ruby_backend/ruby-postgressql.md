## step create gemfile

```bash
rails new backend --api -d postgresql
```

## run dependency install

```bash
bundle install
```

## ต้องเปิด PostgreSQL ก่อน

```terminal
colima start
docker run --name postgres-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=backend_development -p 5432:5432 -d postgres:18
```

## check status

```terminal
docker ps

```

### check version postgressql

```
docker exec -it postgres-db psql -U postgres -c "SELECT version();"
```

### config database ใช้กับ Rails

```ruby
# config/database.yml
default: &default
  adapter: postgresql
  encoding: unicode
  # For details on connection pooling, see Rails configuration guide
  # https://guides.rubyonrails.org/configuring.html#database-pooling
  host: localhost
  port: 5432
  username: postgres
  password: password
  pool: 5
  max_connections: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
```

## create database

```terminal
rails db:create
```

## run server

```terminal
rails server
```
