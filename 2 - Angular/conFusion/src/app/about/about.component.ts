import { Component, Inject, OnInit } from '@angular/core'
import { expand, flyInOut } from '../animations/animations'
import { LeaderService } from '../services/leader.service'
import { Leader } from '../shared/leader'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {
  leaders: Leader[]
  leaderErrMess: string

  constructor(
    private leaderService: LeaderService,
    @Inject('baseURL') private baseURL
  ) { }

  ngOnInit() {
    this.leaderService.getLeaders()
      .subscribe(leaders => this.leaders = leaders, errmess => this.leaderErrMess = <any>errmess)
  }

}
