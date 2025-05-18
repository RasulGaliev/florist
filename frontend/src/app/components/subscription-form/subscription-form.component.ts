import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-subscription-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        CommonModule,
    ],
    templateUrl: './subscription-form.component.html',
    styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent {
    private fb = inject(FormBuilder);
    private api = inject(ApiService);
    private snackBar = inject(MatSnackBar);
    private router = inject(Router);

    subscriptionForm = this.fb.group({
        plan: ['monthly', [Validators.required]],
        duration: ['12', [Validators.required, Validators.min(1)]],
        recipient: this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.pattern(/^\+?[0-9]{10,15}$/)]]
        }),
        address: this.fb.group({
            street: ['', [Validators.required]],
            city: ['', [Validators.required]],
            deliveryTime: ['', [Validators.required]]
        }),
        payment: this.fb.group({
            cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
            expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]],
            cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]]
        })
    });

    plans = [
        { value: 'weekly', label: 'Еженедельная доставка', price: '2500 ₽/нед' },
        { value: 'monthly', label: 'Ежемесячная подписка', price: '8500 ₽/мес' },
        { value: 'annual', label: 'Годовая подписка', price: '90 000 ₽/год' }
    ];

    async onSubmit() {
        if (this.subscriptionForm.valid) {
            try {
                await this.api.createSubscription(this.subscriptionForm.value);
                this.snackBar.open(' оформлена успешно!', 'OK', { duration: 3000 });
                this.router.navigate(['/success']);
            } catch (error) {
                this.snackBar.open('Ошибка при оформлении подписки', 'Закрыть');
            }
        }
    }
}