import { NgModule } from '@angular/core';
import { MatSidenavModule, MatToolbarModule, MatListModule, MatButtonModule, MatIconModule, MatSliderModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

const Material = [
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  BrowserAnimationsModule,
  MatSliderModule,
  MatSelectModule
]

@NgModule({
  imports: [ Material ],
  exports: [ Material ]
})
export class MaterialModule { }
