import { NgModule } from "@angular/core";
import { ActionBarComponent } from '../ui/action-bar/action-bar.component';
import { NativeScriptCommonModule, NativeScriptRouterModule } from "nativescript-angular";

@NgModule({
    imports: [NativeScriptCommonModule,
        NativeScriptRouterModule],
    declarations: [
        ActionBarComponent
    ],
    exports: [ActionBarComponent]
})
export class AppSharedModule {

}
