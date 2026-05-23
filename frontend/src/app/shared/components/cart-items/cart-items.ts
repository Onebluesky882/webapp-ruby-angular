import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createIcons, icons } from 'lucide'; // หรือใช้ icon ที่มีอยู่แล้ว

// Interface สำหรับข้อมูลสินค้าในตะกร้า
interface CartItemData {
  id: string;
  image: string;
  name: string;
  quantity: number;
  priceCents: number;
  subCategory: string;
  // ... เพิ่ม property อื่นๆ ที่จำเป็น
}

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule], // Import Trash2 icon หรือ icon อื่นๆ
  templateUrl: './cart-items.html',
})
export class CartItemComponent {
  @Input({ required: true }) item!: CartItemData; // รับข้อมูลสินค้าเข้ามา

  @Output() quantityChange = new EventEmitter<{ id: string; quantity: number }>();
  @Output() removeItem = new EventEmitter<string>(); // ส่ง ID สินค้าออกไปเพื่อลบ

  get totalPrice(): number {
    return this.item.priceCents * this.item.quantity;
  }

  // ฟังก์ชันเพิ่ม/ลด จำนวนสินค้า
  updateQuantity(newQuantity: number) {
    if (newQuantity > 0) {
      this.quantityChange.emit({ id: this.item.id, quantity: newQuantity });
    } else {
      this.removeCartItem(); // ถ้าจำนวนเป็น 0 ให้ลบออก
    }
  }

  // ฟังก์ชันลบสินค้า
  removeCartItem() {
    this.removeItem.emit(this.item.id);
  }

  // ฟังก์ชันแปลงราคา (ใช้ซ้ำกับหน้า Home)
  formatPrice(cents: number): string {
    return (cents / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 });
  }
}
