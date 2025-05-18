// register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: this.passwordMatchValidator
        });
    }

    ngOnInit(): void {
        if (this.authService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    get f() { return this.registerForm.controls; }

    passwordMatchValidator(form: FormGroup) {
        return form.get('password')?.value === form.get('confirmPassword')?.value
            ? null : { passwordMismatch: true };
    }

    onSubmit() {
        this.submitted = true;
        this.error = '';

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.register(
            this.f['name'].value,
            this.f['email'].value,
            this.f['password'].value
        ).subscribe({
            next: () => {
                this.router.navigate(['/login'], {
                    queryParams: { registered: true }
                });
            },
            error: error => {
                this.error = error;
                this.loading = false;
            }
        });
    }
}