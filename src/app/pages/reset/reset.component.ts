import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      password_confirmed: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    const formData = this.form.getRawValue();
    const data = {
      token: this.route.snapshot.params['token'],
      password: formData.password,
      password_confirm: formData.password_confirmed,  
    };

    console.log('Data before sending to the server:', data);

    this.http.post('/api/reset', data)
  .subscribe({
    next: () => {
      console.log('Password reset successful. Navigating to login.');
      this.router.navigate(['/login']);
    },
    error: (error) => {
      console.error('Error during password reset:', error);
    }
  });
  }
}
