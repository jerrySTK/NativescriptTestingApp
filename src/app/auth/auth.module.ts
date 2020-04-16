import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '../shared/modules/app-shared.module';
import { NativeScriptFormsModule, NativeScriptRouterModule } from 'nativescript-angular';
import { Routes } from '@angular/router';




const routes: Routes = [
    { path: '', component: AuthComponent}
]

@NgModule({
  declarations: [AuthComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ReactiveFormsModule,
    AppSharedModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule { }
