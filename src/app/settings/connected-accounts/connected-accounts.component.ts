import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-connected-accounts',
  templateUrl: './connected-accounts.component.html',
  styleUrls: ['./connected-accounts.component.scss']
})
export class ConnectedAccountsComponent implements OnInit {

  public error: boolean = false;
  public success: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    if (this.route.snapshot.queryParams.failed) {
      this.error = true;
    }

    if (this.route.snapshot.queryParams.success) {
      this.success = true;
    }

  }

}
