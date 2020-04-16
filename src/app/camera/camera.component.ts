import { Component, OnInit, NgZone } from '@angular/core';
import * as camera from "nativescript-camera";
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';

@Component({
    selector: 'ns-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
    imageAsset: ImageAsset;
    constructor(private ngZone: NgZone) { }

    ngOnInit() {

    }

    takePhoto() {

        camera.requestPermissions().then(
            () => {
                camera.takePicture().then(asset => {
                    console.log("Tome la foto");
                    this.imageAsset = asset;
                }).catch(err=>{
                    console.log(err);
                });
            },
            () => {
                // permission request rejected
                // ... tell the user ...
            }
        );

    }
}
