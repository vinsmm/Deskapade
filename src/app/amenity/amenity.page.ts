import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-amenity',
  templateUrl: './amenity.page.html',
  styleUrls: ['./amenity.page.scss'],
})
export class AmenityPage implements OnInit {
  shownGroup = false
  showless: boolean
  showmore: boolean = true
  id: any;credits
  vendorData:any;
  constructor(private navController: NavController, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
        this.vendorData=JSON.parse(params["vendorData"]);
        localStorage.setItem('vendor_id',this.vendorData.vendor_id)
    });

    
  }

  ngOnInit() {
    this.calculateCredits()
  }
  calculateCredits(){
    var entered_hours=parseInt(localStorage.getItem("min_hours"));
    var entered_persons=parseInt(localStorage.getItem('persons'));
    // var plainCredit=parseInt(this.vendorData.booking_hours)+parseInt(this.vendorData.booking_type)+parseInt(this.vendorData.max_persons);
    
    var hoursParam=Math.ceil(entered_hours/parseInt(this.vendorData.booking_hours));
    var personParam=Math.ceil(entered_persons/parseInt(this.vendorData.max_persons))
    
    if(hoursParam<=personParam){
      this.credits=parseInt(this.vendorData.fix_price)*personParam
    }else{
      this.credits=parseInt(this.vendorData.fix_price)*hoursParam
    }
   }
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
      this.showmore = true
      this.showless = false
    }
    else {
      this.showless = true
      this.showmore = false
      this.shownGroup = group;
    }
  } 

  isGroupShown(group) {
    return this.shownGroup === group;
  } 


  deatil() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        vendorData: JSON.stringify(this.vendorData)

      }
    }
    this.navController.navigateForward([`/tabs/home/list/amenity/detailtwo`], navigationExtras);

  }



}
