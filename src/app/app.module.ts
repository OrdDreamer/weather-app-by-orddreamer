import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule }    from '@angular/common/http';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';


import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    WeatherWidgetComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // FormsModule,
    // ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    // MatIconModule,
    // MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatRippleModule,
    MatTabsModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
