import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../core/services/client.service';
import { InventoryService, InventoryRecord } from '../../core/services/inventory.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  clientCount = 0;
  stockItemCount = 0;
  stockTotalQuantity = 0;
  missingItemCount = 0;
  hasMissingItems = false;

  constructor(
    private clientService: ClientService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.clientService.clients$.subscribe(clients => this.clientCount = clients.length);
    this.inventoryService.inventory$.subscribe(records => this.updateInventorySummary(records));
  }

  private updateInventorySummary(records: InventoryRecord[]): void {
    const inventoryMap = records.reduce((map, record) => {
      const current = map.get(record.sku) ?? 0;
      const delta = record.movementType === 'entrada' ? record.quantity : -record.quantity;
      map.set(record.sku, current + delta);
      return map;
    }, new Map<string, number>());

    this.stockItemCount = inventoryMap.size;
    this.stockTotalQuantity = [...inventoryMap.values()].reduce((total, qty) => total + qty, 0);
    this.missingItemCount = [...inventoryMap.values()].filter(qty => qty <= 0).length;
    this.hasMissingItems = this.missingItemCount > 0;
  }
}
