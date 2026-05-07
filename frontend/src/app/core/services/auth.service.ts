import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface AuthResponse {
  token: string;
  expiresIn: number;
  user: any;
}

@Injectable()
export class AuthService {
  private tokenKey = 'restaurant_token';
  private userSubject = new BehaviorSubject<any>(this.getStoredUser());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      map(response => {
        this.storeToken(response.token);
        this.storeUser(response.user);
        return response;
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, data);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('restaurant_user');
    this.userSubject.next(null);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private storeUser(user: any): void {
    localStorage.setItem('restaurant_user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  private getStoredUser(): any {
    const value = localStorage.getItem('restaurant_user');
    return value ? JSON.parse(value) : null;
  }
}
