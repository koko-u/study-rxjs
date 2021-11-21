import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from "@angular/forms";
import { OfOperatorComponent } from './main/code-block/of-operator/of-operator.component';
import { MapOperatorComponent } from './main/code-block/map-operator/map-operator.component';
import { FilterOperatorComponent } from './main/code-block/filter-operator/filter-operator.component';
import { ThrottleTimeOperatorComponent } from './main/code-block/throttle-time-operator/throttle-time-operator.component';
import { DebounceTimeOperatorComponent } from './main/code-block/debounce-time-operator/debounce-time-operator.component';
import { DistinctUntilChangedOperatorComponent } from './main/code-block/distinct-until-changed-operator/distinct-until-changed-operator.component';
import { MergeOperatorComponent } from './main/code-block/merge-operator/merge-operator.component';
import { SwitchMapOperatorComponent } from './main/code-block/switch-map-operator/switch-map-operator.component';
import { SkipOperatorComponent } from './main/code-block/skip-operator/skip-operator.component';
import { TakeOperatorComponent } from './main/code-block/take-operator/take-operator.component';
import { FinalizeOperatorComponent } from './main/code-block/finalize-operator/finalize-operator.component';
import { StreamFormComponent } from './main/stream-form/stream-form.component';
import { LogComponent } from './main/log/log.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    FinalizeOperatorComponent,
    StreamFormComponent,
    LogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
