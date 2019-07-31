import { Component, OnInit } from '@angular/core';
import { MenuController } from "@ionic/angular";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user";
import { AlertService } from "../../services/alert.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public loggedInUser: User;

  constructor(
    private _menu: MenuController,
    private _auth: AuthService,
    private _alert: AlertService
  ) {}

  ngOnInit() {
    this._menu.enable(true);
  }

  async ionViewWillEnter() {
    this._auth.user().then(response => {
      this.loggedInUser = response.results;
      console.log(this.loggedInUser);
    }).catch(error => {
      console.log(error);
    });
  }
}
