shared → feature
เหมือน react component ไป page ต่างๆ

core คือ hooks react
เก็บ logic แยก

step

1. core คือ hooks react
2. shared คือ component ที่ใช้ร่วมกัน
3. feature คือ page ต่างๆ

## ทำ core

ng g service core/services/api

## ทำ shared component

ng g component shared/components/item-card

## ทำ feature

ng g component features/home
