import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  private accountService = inject(AccountService);
  toastr = inject(ToastrService);
  http = inject(HttpClient);
  registerMode = false;
  users: any;

  registerToggle() {
    if (!this.accountService.currentUser()) {
      this.registerMode = !this.registerMode;
    }
    else {
      this.toastr.error("You already have an account!");
    }
    
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
