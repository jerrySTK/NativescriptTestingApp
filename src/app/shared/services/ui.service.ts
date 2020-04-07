import { Injectable, ViewContainerRef } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UIService {

    private toggleDrawer: Subject<boolean> = new Subject<boolean>();
    private _rootVCRef: ViewContainerRef;

    constructor() {
    }

    get rootVCRef() {
        return this._rootVCRef;
    }

    set rootVCRef(vc: ViewContainerRef){
        this.rootVCRef = vc;
    }

    get drawerState() {
        return this.toggleDrawer.asObservable();
    }

    setToggleDrawer(){
        return this.toggleDrawer.next();
    }
}
