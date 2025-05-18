import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        // Замените на реальный API-вызов
        return of({ id: 1, email, token: 'fake-jwt-token' }).pipe(
            tap(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            })
        );
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    register(name: string, email: string, password: string) {
        return this.http.post<any>('/api/register', {
            name,
            email,
            password
        }).pipe(
            catchError(error => {
                throw this.handleError(error);
            })
        );
    }

    private handleError(error: HttpErrorResponse) {
        return error.error?.message || 'Неизвестная ошибка';
    }
}