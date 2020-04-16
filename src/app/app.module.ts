import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppComponent } from "./app.component";

import { AppRoutingModule } from "./app-routing.module";
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { AuthModule } from "./auth/auth.module";
import { CameraComponent } from './camera/camera.component';
import { ScreenOrientationComponent } from './screen-orientation/screen-orientation.component';

import { ComponentOneComponent } from './screen-orientation/component-one/component-one.component';
import { ComponentTwoComponent } from './screen-orientation/component-two/component-two.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
        NativeScriptHttpClientModule,
        AuthModule
    ],
    declarations: [
        AppComponent,
        CameraComponent,
        ScreenOrientationComponent,
        ComponentOneComponent,
        ComponentTwoComponent,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
