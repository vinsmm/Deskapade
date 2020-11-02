import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pathToFileURL } from 'url';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          },
          {
            path: 'list',
            children: [
              {
                path: '',
                loadChildren: () => import('../list/list.module').then(m => m.ListPageModule)
              },
              {
                path: 'amenity',
                children: [
                  {
                    path: '',
                    loadChildren: () => import('../amenity/amenity.module').then(m => m.AmenityPageModule)
                  },

                  {
                    path: 'detailtwo',
                    children: [
                      {
                        path: '',
                        loadChildren: () => import('../detailtwo/detailtwo.module').then(m => m.DetailtwoPageModule)
                      },
                      {
                        path: 'flowcredit',
                        children: [
                          {
                            path: '',
                            loadChildren: () => import('../flowcredit/flowcredit.module').then(m => m.FlowcreditPageModule)
                          },
                          {
                            path: 'flowactivity',
                            loadChildren: () => import('../flowactivity/flowactivity.module').then(m => m.FlowactivityPageModule)
                          },
                          {
                            path: 'stripay',
                            loadChildren: () => import('../stripay/stripay.module').then(m => m.StripayPageModule)
                          },
                          {
                            path: 'bookingconfirm',
                            loadChildren: () => import('../bookingconfirm/bookingconfirm.module').then(m => m.BookingconfirmPageModule)
                          }


                        ]
                      },
                      {
                        path: 'flowlogin',
                        children: [
                          {
                            path: '',
                            loadChildren: () => import('../flowlogin/flowlogin.module').then(m => m.FlowloginPageModule)
                          },
                          {
                            path: 'flowregister',
                            loadChildren: () => import('../flowregister/flowregister.module').then(m => m.FlowregisterPageModule)
                          },
                          {
                            path: 'verifycode',
                            loadChildren: () => import('../verifycode/verifycode.module').then(m => m.VerifycodePageModule)
                          },
                          {
                            path: 'flowcredit',
                            children: [
                              {
                                path: '',
                                loadChildren: () => import('../flowcredit/flowcredit.module').then(m => m.FlowcreditPageModule)
                              },
                              {
                                path: 'flowactivity',
                                loadChildren: () => import('../flowactivity/flowactivity.module').then(m => m.FlowactivityPageModule)
                              },
                              {
                                path: 'stripay',
                                loadChildren: () => import('../stripay/stripay.module').then(m => m.StripayPageModule)
                              },
                              {
                                path: 'bookingconfirm',
                                loadChildren: () => import('../bookingconfirm/bookingconfirm.module').then(m => m.BookingconfirmPageModule)
                              }


                            ]
                          },
                          {
                            path: 'bookingconfirm',
                            loadChildren: () => import('../bookingconfirm/bookingconfirm.module').then(m => m.BookingconfirmPageModule)
                          },
                          {
                            path: 'guestcrerdit',
                            children: [
                              {
                                path: '',
                                loadChildren: () => import('../guestcrerdit/guestcrerdit.module').then(m => m.GuestcrerditPageModule)
                              },
                              {
                                path: 'flowactivity',
                                loadChildren: () => import('../flowactivity/flowactivity.module').then(m => m.FlowactivityPageModule)
                              },
                              {
                                path: 'stripay',
                                loadChildren: () => import('../stripay/stripay.module').then(m => m.StripayPageModule)
                              }


                            ]
                          }

                        ]
                      }
                    ]

                  },

                ]
              },

            ]
          },

          {
            path: 'amenityone',
            children: [
              {
                path: '',
                loadChildren: () => import('../amenityone/amenityone.module').then(m => m.AmenityonePageModule)
              },

              {
                path: 'venudetail',
                // loadChildren: () => import('../venudetail/venudetail.module').then(m => m.VenudetailPageModule)
                children: [
                  {
                    path: '',
                    loadChildren: () => import('../venudetail/venudetail.module').then(m => m.VenudetailPageModule)
                  },
                  {
                    path: 'flowcredit',
                    children: [
                      {
                        path: '',
                        loadChildren: () => import('../flowcredit/flowcredit.module').then(m => m.FlowcreditPageModule)
                      },
                      {
                        path: 'flowactivity',
                        loadChildren: () => import('../flowactivity/flowactivity.module').then(m => m.FlowactivityPageModule)
                      },
                      {
                        path: 'stripay',
                        loadChildren: () => import('../stripay/stripay.module').then(m => m.StripayPageModule)
                      }


                    ]
                  },
                  {
                    path: 'flowlogin',
                    children: [
                      {
                        path: '',
                        loadChildren: () => import('../flowlogin/flowlogin.module').then(m => m.FlowloginPageModule)
                      },
                      {
                        path: 'flowregister',
                        loadChildren: () => import('../flowregister/flowregister.module').then(m => m.FlowregisterPageModule)
                      },
                      {
                        path: 'verifycode',
                        loadChildren: () => import('../verifycode/verifycode.module').then(m => m.VerifycodePageModule)
                      },
                      {
                        path: 'flowcredit',
                        children: [
                          {
                            path: '',
                            loadChildren: () => import('../flowcredit/flowcredit.module').then(m => m.FlowcreditPageModule)
                          },
                          {
                            path: 'flowactivity',
                            loadChildren: () => import('../flowactivity/flowactivity.module').then(m => m.FlowactivityPageModule)
                          },
                          {
                            path: 'stripay',
                            loadChildren: () => import('../stripay/stripay.module').then(m => m.StripayPageModule)
                          }


                        ]
                      }


                    ]
                  }
                ]
              },
            ]
          },



        ]

      },
      {
        path: 'upcomingbooking',
        children: [
          {
            path: '',
            loadChildren: () => import('../upcomingbooking/upcomingbooking.module').then(m => m.UpcomingbookingPageModule)
          },

          {
            path: 'bookagain',
            loadChildren: () => import('../bookagain/bookagain.module').then(m => m.BookagainPageModule)
          },
          {
            path: 'stripay',
            loadChildren: () => import('../stripay/stripay.module').then(m => m.StripayPageModule)
          },
          {
            path: 'bookingconfirm',
            loadChildren: () => import('../bookingconfirm/bookingconfirm.module').then(m => m.BookingconfirmPageModule)
          },
          {
            path: 'flowcredit',
            children: [
              {
                path: '',
                loadChildren: () => import('../flowcredit/flowcredit.module').then(m => m.FlowcreditPageModule)
              },
              {
                path: 'flowactivity',
                loadChildren: () => import('../flowactivity/flowactivity.module').then(m => m.FlowactivityPageModule)
              },
              {
                path: 'stripay',
                loadChildren: () => import('../stripay/stripay.module').then(m => m.StripayPageModule)
              },
              {
                path: 'bookingconfirm',
                loadChildren: () => import('../bookingconfirm/bookingconfirm.module').then(m => m.BookingconfirmPageModule)
              },
            ]
          }
        ]

      },

      {
        path: 'credit',
        children: [
          {
            path: '',
            loadChildren: () => import('../credit/credit.module').then(m => m.CreditPageModule)
          },

          {
            path: 'activity',
            loadChildren: () => import('../activity/activity.module').then(m => m.ActivityPageModule)
          },
          {
            path: 'stripay',
            loadChildren: () => import('../stripay/stripay.module').then(m => m.StripayPageModule)
          }
        ]
      },


      {
        path: 'menu',
        children: [
          {
            path: '',
            loadChildren: () => import('../menu/menu.module').then(m => m.MenuPageModule)
          },

          {
            path: 'profile',
            children: [
              {
                path: '',
                loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
              },
              {
                path: 'editprofile',
                loadChildren: () => import('../editprofile/editprofile.module').then(m => m.EditprofilePageModule)
              }
            ]
          },

          {
            path: 'help',
            loadChildren: () => import('../help/help.module').then(m => m.HelpPageModule)
          },
          {
            path: 'terms',
            loadChildren: () => import('../terms/terms.module').then(m => m.TermsPageModule)
          },
        ]
      },

      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
