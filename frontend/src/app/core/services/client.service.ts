import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ClientRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
  createdAt: string;
}

@Injectable()
export class ClientService {
  private readonly storageKey = 'restaurant_clients';
  private clientsSubject = new BehaviorSubject<ClientRecord[]>(this.loadClients());
  public clients$ = this.clientsSubject.asObservable();

  private loadClients(): ClientRecord[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveClients(clients: ClientRecord[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(clients));
    this.clientsSubject.next(clients);
  }

  getAll(): ClientRecord[] {
    return this.clientsSubject.value;
  }

  add(client: Omit<ClientRecord, 'id' | 'createdAt'>): ClientRecord {
    const next: ClientRecord = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...client
    };
    const updated = [...this.clientsSubject.value, next];
    this.saveClients(updated);
    return next;
  }
}
