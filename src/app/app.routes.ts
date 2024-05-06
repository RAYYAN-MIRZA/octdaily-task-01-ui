import { Routes } from '@angular/router';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ScheduleDemoComponent } from './components/schedule-demo/schedule-demo.component';

export const routes: Routes = [
  {path:'contact-us',component:ContactUsComponent},
  {path:'schedule-demo',component:ScheduleDemoComponent}
];
