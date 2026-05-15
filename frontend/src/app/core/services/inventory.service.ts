import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type InventoryMovementType = 'entrada' | 'saida';

export interface InventoryRecord {
  id: number;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  movementType: InventoryMovementType;
  createdAt: string;
}

@Injectable()
export class InventoryService {
  private readonly storageKey = 'restaurant_inventory';
  private inventorySubject = new BehaviorSubject<InventoryRecord[]>(this.loadInventory());
  public inventory$ = this.inventorySubject.asObservable();

  private loadInventory(): InventoryRecord[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveInventory(records: InventoryRecord[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(records));
    this.inventorySubject.next(records);
  }

  getAll(): InventoryRecord[] {
    return this.inventorySubject.value;
  }

  add(record: Omit<InventoryRecord, 'id' | 'createdAt'>): InventoryRecord {
    const next: InventoryRecord = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...record
    };
    const updated = [...this.inventorySubject.value, next];
    this.saveInventory(updated);
    return next;
  }
}
