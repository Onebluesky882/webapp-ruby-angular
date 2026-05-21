# UUID Generate

เพิ่มในไฟล์ `config/application.rb`

```ruby
config.generators do |g|
  g.orm :active_record, primary_key_type: :uuid
end
```

ensure PostgreSQL support UUID
terminal: rails g migration enable_uuid
