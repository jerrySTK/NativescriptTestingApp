import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from 'nativescript-angular';
import { Routes } from "@angular/router";
import { AuthGuardService } from "./auth/auth-guard.service";
import { CameraComponent } from "./camera/camera.component";
import { ScreenOrientationComponent } from "./screen-orientation/screen-orientation.component";


const routes: Routes = [
    { path: 'auth', loadChildren: '~/app/auth/auth.module#AuthModule' },
    { path: 'challenges', loadChildren: '~/app/challenges/challenges.module#ChallengesModule', canLoad: [AuthGuardService] },
    { path: 'photo', component: CameraComponent },
    { path: 'multi-screen', component: ScreenOrientationComponent },
    { path: '', redirectTo: 'challenges', pathMatch: 'full' }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [
        NativeScriptRouterModule
    ]
})
export class AppRoutingModule {

}
