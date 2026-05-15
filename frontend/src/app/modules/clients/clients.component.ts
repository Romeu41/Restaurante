import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientRecord, ClientService } from '../../core/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  form: FormGroup;
  clients: ClientRecord[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.clientService.clients$.subscribe(clients => this.clients = clients);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      this.clientService.add(this.form.value);
      this.successMessage = 'Cliente cadastrado com sucesso!';
      this.errorMessage = '';
      this.form.reset();
      this.form.get('notes')?.setValue('');
      setTimeout(() => this.successMessage = '', 2500);
    } catch (error) {
      this.errorMessage = 'Não foi possível cadastrar o cliente.';
      this.successMessage = '';
    }
  }
}
