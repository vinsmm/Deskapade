import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    // loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
    children:[
      {
        path: '',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'guestlogin',
        children: [
          {
            path: '',
            loadChildren: () => import('./guestlogin/guestlogin.module').then(m => m.GuestloginPageModule)
          },
          {
            path: 'guestcrerdit',
            loadChildren: () => import('./guestcrerdit/guestcrerdit.module').then(m => m.GuestcrerditPageModule)
          }
        ]

      },
      {
        path: 'credit',
        children: [
          {
            path: '',
            loadChildren: () => import('./credit/credit.module').then(m => m.CreditPageModule)
          },
          {
            path: 'activity',
            loadChildren: () => import('./activity/activity.module').then(m => m.ActivityPageModule)
          }
        ]
      },
      {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
      }
      
    ]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'venudetail',
    loadChildren: () => import('./venudetail/venudetail.module').then( m => m.VenudetailPageModule)
  },
  {
    path: 'detailtwo',
    loadChildren: () => import('./detailtwo/detailtwo.module').then( m => m.DetailtwoPageModule)
  },
  {
    path: 'bookingconfirm',
    loadChildren: () => import('./bookingconfirm/bookingconfirm.module').then( m => m.BookingconfirmPageModule)
  },
  {
    path: 'guestlogin',
    loadChildren: () => import('./guestlogin/guestlogin.module').then( m => m.GuestloginPageModule)
  },
  {
    path: 'credit',
    loadChildren: () => import('./credit/credit.module').then( m => m.CreditPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'upcomingbooking',
    loadChildren: () => import('./upcomingbooking/upcomingbooking.module').then( m => m.UpcomingbookingPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'verifycode',
    loadChildren: () => import('./verifycode/verifycode.module').then( m => m.VerifycodePageModule)
  },
  {
    path: 'amenity',
    loadChildren: () => import('./amenity/amenity.module').then( m => m.AmenityPageModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./review/review.module').then( m => m.ReviewPageModule)
  },
  {
    path: 'amenityone',
    loadChildren: () => import('./amenityone/amenityone.module').then( m => m.AmenityonePageModule)
  },
  {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module').then( m => m.ActivityPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'loginmain',
    loadChildren: () => import('./loginmain/loginmain.module').then( m => m.LoginmainPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'loggedcredit',
    loadChildren: () => import('./loggedcredit/loggedcredit.module').then( m => m.LoggedcreditPageModule)
  },
  {
    path: 'guestcrerdit',
    loadChildren: () => import('./guestcrerdit/guestcrerdit.module').then( m => m.GuestcrerditPageModule)
  },
  {
    path: 'flowcredit',
    loadChildren: () => import('./flowcredit/flowcredit.module').then( m => m.FlowcreditPageModule)
  },
  {
    path: 'flowactivity',
    loadChildren: () => import('./flowactivity/flowactivity.module').then( m => m.FlowactivityPageModule)
  },
  {
    path: 'stripay',
    loadChildren: () => import('./stripay/stripay.module').then( m => m.StripayPageModule)
  },
  {
    path: 'flowregister',
    loadChildren: () => import('./flowregister/flowregister.module').then( m => m.FlowregisterPageModule)
  },
  {
    path: 'bookagain',
    loadChildren: () => import('./bookagain/bookagain.module').then( m => m.BookagainPageModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
