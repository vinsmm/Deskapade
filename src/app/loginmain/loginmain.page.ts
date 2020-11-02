import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-loginmain',
  templateUrl: './loginmain.page.html',
  styleUrls: ['./loginmain.page.scss'],
})
export class LoginmainPage implements OnInit {

  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() {
  }
  
   forgot() {
this.navController.navigateForward(`/forgotpassword`);
  }
  
    registein() {
  this.navController.navigateForward(`/registration`);
  }

}
