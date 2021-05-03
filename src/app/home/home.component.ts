import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { flyInOut,expand } from '../animations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style': 'display:block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  dishErrMess: string;
  promotion: Promotion;
  promotionErrMess: string;
  leader: Leader;
  leaderErrMess: string;

  constructor(private dishservice: DishService,
              private promotionservice: PromotionService,
              private leaderService: LeaderService,
              @Inject('BaseURL') private baseURL) {}

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe(dish => this.dish = dish,
      errmess=>this.dishErrMess=<any>errmess);
      

    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion,
      errmess=>this.promotionErrMess=<any>errmess);

    this.leaderService.getFeaturedLeader()
    .subscribe(leader => this.leader = leader,
      errmess=>this.leaderErrMess=<any>errmess);

    /*this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionservice.getFeaturedPromotion();
    this.leader =  this.leaderService.getFeaturedLeader();*/
    /*this.dishservice.getFeaturedDish().then(dish => this.dish = dish);
    this.promotionservice.getFeaturedPromotion().then(promotion => this.promotion = promotion);
    this.leaderService.getFeaturedLeader().then(leader => this.leader = leader);*/

  }
  
}
