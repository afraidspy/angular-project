import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LEADERS } from '../shared/leaders';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[] = LEADERS;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private leaderService:LeaderService) {
    
   }

  ngOnInit(): void {
    this.leaders = this.leaderService.getLeaders();
  }

}
