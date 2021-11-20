import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from "@angular/forms";
import { OfOperatorComponent } from './main/of-operator/of-operator.component';
import { MapOperatorComponent } from './main/map-operator/map-operator.component';
import { FilterOperatorComponent } from './main/filter-operator/filter-operator.component';
import { ThrottleTimeOperatorComponent } from './main/throttle-time-operator/throttle-time-operator.component';
import { DebounceTimeOperatorComponent } from './main/debounce-time-operator/debounce-time-operator.component';
import { DistinctUntilChangedOperatorComponent } from './main/distinct-until-changed-operator/distinct-until-changed-operator.component';
import { MergeOperatorComponent } from './main/merge-operator/merge-operator.component';
import { SwitchMapOperatorComponent } from './main/switch-map-operator/switch-map-operator.component';
import { SkipOperatorComponent } from './main/skip-operator/skip-operator.component';
import { TakeOperatorComponent } from './main/take-operator/take-operator.component';
import { FinalizeOperatorComponent } from './main/finalize-operator/finalize-operator.component'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    OfOperatorComponent,
    MapOperatorComponent,
    FilterOperatorComponent,
    ThrottleTimeOperatorComponent,
    DebounceTimeOperatorComponent,
    DistinctUntilChangedOperatorComponent,
    MergeOperatorComponent,
    SwitchMapOperatorComponent,
    SkipOperatorComponent,
    TakeOperatorComponent,
    FinalizeOperatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
