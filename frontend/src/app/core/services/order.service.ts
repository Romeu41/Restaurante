import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface OrderItem {
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderRecord {
  id: number;
  clientId: number | null;
  clientName: string;
  notes: string;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
}

@Injectable()
export class OrderService {
  private readonly storageKey = 'restaurant_orders';
  private ordersSubject = new BehaviorSubject<OrderRecord[]>(this.loadOrders());
  public orders$ = this.ordersSubject.asObservable();

  private loadOrders(): OrderRecord[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveOrders(orders: OrderRecord[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
    this.ordersSubject.next(orders);
  }

  getAll(): OrderRecord[] {
    return this.ordersSubject.value;
  }

  add(order: Omit<OrderRecord, 'id' | 'createdAt'>): OrderRecord {
    const next: OrderRecord = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...order
    };
    const updated = [...this.ordersSubject.value, next];
    this.saveOrders(updated);
    return next;
  }
}
