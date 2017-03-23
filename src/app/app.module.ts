import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {VisTimelineService, VisTimelineDirective} from "ng2-vis";
import {VisTimelineExampleComponent} from "./imeline-example.component";

@NgModule({
  declarations: [
    AppComponent,
    VisTimelineExampleComponent,
    VisTimelineDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    VisTimelineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
