must care syntax and naming convention in ruby

\*\*\* care caMal case
CreateUserDTO not working

CreateUserDto working

Rails ใช้ Zeitwerk convention = file name ↔ class name ต้อง match แบบ strict

เพราะ Rails แยก “DTO” เป็นคำพิเศษใน Zeitwerk parsing

แต่ ALL CAPS suffix (DTO, API, ID) มีปัญหาใน Zeitwerk

ชื่อไฟล์
user_dto.rb

ห้ามตั้ง user-dto.rb

ตั้งชื่อ variable ให้ snake_case
ตัวอย่าง user_dto
ห้าม userDto
