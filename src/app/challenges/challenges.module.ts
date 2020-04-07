import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { DayModalComponent } from "./day-modal/day-modal.component";
import { ChallengeTabsComponent } from "./challenge-tabs/challenge-tabs.component";
import { TodayComponent } from "./today/today.component";
import { CurrentChallengeComponent } from "./current-challenge/current-challenge.component";
import {  NativeScriptFormsModule, NativeScriptCommonModule } from "nativescript-angular";
import { ChallengesRoutingModule } from "./challenges-routing.module";
import { AppSharedModule } from "../shared/modules/app-shared.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ChallengesRoutingModule,
        AppSharedModule
    ],
    declarations: [
        ChallengeTabsComponent,
        DayModalComponent,
        TodayComponent,
        CurrentChallengeComponent
    ],
    entryComponents: [ DayModalComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChallengesModule {

}
