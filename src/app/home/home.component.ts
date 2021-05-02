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
  leader: Leader;
  dishErrMess:string;

  constructor(private dishservice: DishService,
              private promotionservice: PromotionService,
              private leaderService: LeaderService,
              @Inject('BaseURL') private baseURL) {

                console.log("BaseURL*** " +baseURL);
               }

  ngOnInit() {
<<<<<<< HEAD
    this.dishservice.getFeaturedDish()
    .subscribe(dish => this.dish = dish,
      errmess=>this.dishErrMess=<any>errmess);
      console.log("eRROR........");
      console.log(this.dishErrMess);
    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion);
=======
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,
      errmess =>this.dishErrMess=<any>errmess );
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
>>>>>>> ee2cac48e8c012b31efd8a4c54055ab7aa24d77a
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader);
    /*this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionservice.getFeaturedPromotion();
    this.leader =  this.leaderService.getFeaturedLeader();*/
    /*this.dishservice.getFeaturedDish().then(dish => this.dish = dish);
    this.promotionservice.getFeaturedPromotion().then(promotion => this.promotion = promotion);
    this.leaderService.getFeaturedLeader().then(leader => this.leader = leader);*/

  }
  
}
