import { inject, Injectable } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AccountService } from "../_services/account.service";
import { ToastrService } from "ngx-toastr";

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

    if (accountService.currentUser()) {
      return true;
    } else {
      /* this.router.navigate(['events']); */
      toastr.error('You shall not pass!')
      return false;
    }
}
