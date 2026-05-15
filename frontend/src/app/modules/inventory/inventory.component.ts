import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryRecord, InventoryService } from '../../core/services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  form: FormGroup;
  inventory: InventoryRecord[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private inventoryService: InventoryService) {
    this.form = this.fb.group({
      productName: ['', Validators.required],
      sku: ['', Validators.required],
      movementType: ['entrada', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.inventoryService.inventory$.subscribe(records => this.inventory = records);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      this.inventoryService.add(this.form.value);
      this.successMessage = 'Movimento de estoque registrado com sucesso!';
      this.errorMessage = '';
      this.form.patchValue({ productName: '', sku: '', movementType: 'entrada', quantity: 1, unitPrice: 0 });
      setTimeout(() => this.successMessage = '', 2500);
    } catch (error) {
      this.errorMessage = 'Não foi possível registrar o item no estoque.';
      this.successMessage = '';
    }
  }
}
