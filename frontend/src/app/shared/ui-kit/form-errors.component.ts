import { Component, Input } from "@angular/core";
import { AbstractControl } from "@angular/forms";

// shared/ui-kit/form-errors.component.ts
@Component({
    selector: 'app-form-errors',
    standalone: true,
    template: `
      @if (form?.invalid && (form?.touched || form?.dirty)) {
        <div class="errors">
          @for (error of getErrors(); track error) {
            <div class="error">{{ error }}</div>
          }
        </div>
      }
    `,
    styles: [`
      .errors { color: red; margin: 10px 0; }
      .error { margin: 5px 0; }
    `]
  })
  export class FormErrorsComponent {
    @Input() form?: AbstractControl;
    
    getErrors() {
      return Object.values(this.form?.errors || {});
    }
  }