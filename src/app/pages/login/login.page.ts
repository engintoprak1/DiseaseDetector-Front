import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  identificationNumber:string;
  password:string;
  constructor(private router:NavController,private authService:AuthService,private localStorage:LocalStorageService,private toastr:ToastrService) { }

  ngOnInit() {
  }
  goToRegister(){
    this.router.navigateForward("/register");
  }
  goToHome(){
    this.authService.login({identificationNumber:this.identificationNumber,password:this.password}).subscribe((response)=>{
      if(response.success){
        this.localStorage.set("token",response.data.accessToken);
        this.router.navigateRoot("/home");
        return;
      }
      this.toastr.showErrorMessage(response.message);
    },err=>{
      this.toastr.showErrorMessage(err.error.message);
    })
  }
}
