import { Component, OnInit, Input } from '@angular/core';
import { Frame} from 'tns-core-modules/ui/frame/frame';
import { Page } from "tns-core-modules/ui/page/page";
import { isAndroid } from 'tns-core-modules/platform';
import { UIService } from '../../services/ui.service';
declare var android:any;

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {
  @Input() title: string ="";
  @Input() showBackButton = true;
  @Input() hasMenu = true;

  constructor(private pageObject: Page,
              private uiService: UIService) {
              }

  ngOnInit() {
  }

  get canGoBack(){
     if (this.pageObject && this.pageObject.frame) {
        const canBack = this.pageObject.frame.canGoBack();
        return ( canBack && this.showBackButton);
     }
    return false;
  }

  goBack(){
    if (this.canGoBack)
        Frame.topmost().goBack();
  }

  get android() {
    return isAndroid;
  }

  onToggleSideDrawer(){
    this.uiService.setToggleDrawer()
  }

  onLoadedActionBar() {
    if (isAndroid) {
        const abv = this.pageObject.actionBar.nativeView;
        const backButton = abv.getNavigationIcon();
        if (backButton) {
            backButton.setColorFilter(android.graphics.Color.parseColor('#171717'), (<any>android.graphics).PorterDuff.Mode.SRC_ATOP);
        }
    }
}
}
