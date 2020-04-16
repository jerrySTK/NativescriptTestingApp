import { Component, OnInit, NgZone } from '@angular/core';
import * as orientation from 'nativescript-orientation-free';
import { DeviceOrientation } from 'tns-core-modules/ui/enums';
import { Page } from "tns-core-modules/ui/page/page";
import * as application from 'tns-core-modules/application';
import { OrientationChangedEventData } from 'tns-core-modules/application';

@Component({
  selector: 'ns-screen-orientation',
  templateUrl: './screen-orientation.component.html',
  styleUrls: ['./screen-orientation.component.css']
})
export class ScreenOrientationComponent implements OnInit {
  isPortrait:boolean = null;

  constructor(private ngZone:NgZone) { }

   toggle(){
       this.isPortrait = !this.isPortrait;
   }

  ngOnInit() {

    this.detectOrientation();

    application.on(application.orientationChangedEvent,(args:OrientationChangedEventData )=>{
      this.detectOrientation();
    });


  }

  private detectOrientation(){
    if (orientation.getOrientation() == DeviceOrientation.portrait)
    {
        this.ngZone.run(()=> {
            this.isPortrait = true;
        });

    }
    else if(orientation.getOrientation() == DeviceOrientation.landscape)
    {
        this.ngZone.run(()=> {
            this.isPortrait = false;
        });
    }
    else{
        this.ngZone.run(()=> {
            this.isPortrait = true;
        });
    }
  }

}
