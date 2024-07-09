import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

import IToken, { IAuthUser } from '../../types/IToken';
import ICredentials from '../../types/ICredentials';
import RoleEnum from '../../types/RoleEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authorized: Subject<boolean> = new Subject<boolean>();
  private authUser: IAuthUser | null = null;
  private token: string | null = null;
  private expiresIn: number = 0;

  constructor(private client: HttpClient) {
    this.load();
  }

  private reset(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('expires_in');

    this.token = null;
    this.expiresIn = 0;
    this.authUser = null;
    
    this.authorized.next(this.isAuthenticated());
  }

  private save(token: IToken): void {
    this.reset();

    if (token.token) localStorage.setItem('token', token.token);
    if (token.authUser) localStorage.setItem('auth_user', JSON.stringify(token.authUser));
    if (token.expiresIn) localStorage.setItem('expires_in', token.expiresIn.toString());

    this.load();
  }

  private load(): void {
    this.token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('auth_user') || 'null');
    if (user) this.authUser = user;
    const expiresIn = localStorage.getItem('expires_in');
    if (expiresIn) this.expiresIn = parseInt(expiresIn);
    this.authorized.next(this.isAuthenticated());
  }

  get events(): Observable<boolean> {
    return this.authorized.asObservable();
  }

  public capture() {
    this.authorized.next(this.isAuthenticated());
  }

  public getToken(): string | null {
    return this.token;
  }

  public getAuthUser(): IAuthUser | null {
    return this.authUser;
  }

  public isAuthenticated(): boolean {
    const value = !!this.token;
    return value;
  }

  public hasRole(role: RoleEnum): boolean {
    if (!this.isAuthenticated()) return false;
    if (!this.authUser) return false;

    return this.authUser.role.name == role;
  }

  public login(credentials: ICredentials): Observable<IToken> {
    return this.client
      .post<IToken>('/auth/login', credentials)
      .pipe(tap((token: IToken) => this.save(token)));
  }

  public logout(): void {
    this.reset();
  }
}
