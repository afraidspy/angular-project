import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LEADERS } from '../shared/leaders';
import { flyInOut, expand } from '../animations/app.animations';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style': 'display:block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[] = LEADERS;
  leader: Leader;
  leaderErrMess: string;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private leaderService:LeaderService,
              @Inject('BaseURL') private baseURL) {
               
    
   }

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders );
    
    this.leaderService.getFeaturedLeader()
    .subscribe(leader => this.leader = leader,
      errmess=>this.leaderErrMess=<any>errmess);
    //this.leaders = this.leaderService.getLeaders();
    //this.leaderService.getLeaders().then(leaders => this.leaders = leaders );
  }

}
