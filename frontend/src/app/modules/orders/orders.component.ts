import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientRecord, ClientService } from '../../core/services/client.service';
import { OrderRecord, OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  form: FormGroup;
  clients: ClientRecord[] = [];
  orders: OrderRecord[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private orderService: OrderService
  ) {
    this.form = this.fb.group({
      clientId: [null],
      notes: [''],
      items: this.fb.array([this.createItem()])
    });
  }

  ngOnInit(): void {
    this.clients = this.clientService.getAll();
    this.clientService.clients$.subscribe(clients => this.clients = clients);
    this.orderService.orders$.subscribe(orders => this.orders = orders);
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      productName: ['', Validators.required],
      sku: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0.0, [Validators.required, Validators.min(0)]]
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  getTotal(): number {
    return this.items.controls.reduce((total, control) => {
      const quantity = control.get('quantity')?.value ?? 0;
      const unitPrice = control.get('unitPrice')?.value ?? 0;
      return total + quantity * unitPrice;
    }, 0);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      const clientId = this.form.value.clientId;
      const client = this.clients.find(c => c.id === clientId);

      this.orderService.add({
        clientId,
        clientName: client ? client.name : 'Cliente não informado',
        notes: this.form.value.notes,
        items: this.form.value.items,
        totalAmount: this.getTotal()
      });

      this.successMessage = 'Venda registrada com sucesso!';
      this.errorMessage = '';
      this.form.reset({ clientId: null, notes: '', items: [] });
      this.items.clear();
      this.addItem();
      setTimeout(() => this.successMessage = '', 2500);
    } catch (error) {
      this.errorMessage = 'Não foi possível registrar a venda.';
      this.successMessage = '';
    }
  }
}
