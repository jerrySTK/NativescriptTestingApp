import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ChallengeEditComponent } from "./challenge-edit.component";
import { NativeScriptCommonModule, NativeScriptRouterModule } from "nativescript-angular";
import { AppSharedModule } from "~/app/shared/modules/app-shared.module";

@NgModule({
    declarations: [
        ChallengeEditComponent
    ],
    imports: [
        NativeScriptCommonModule,
        AppSharedModule,
        NativeScriptRouterModule.forChild([
            { path: '', component: ChallengeEditComponent }
        ])
    ],
    exports: [NativeScriptRouterModule],
    schemas: [
        NO_ERRORS_SCHEMA
    ]

})
export class ChallengeEditModule {

}
