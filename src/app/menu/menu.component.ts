import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animations';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style': 'display:block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {
 
  dishes: Dish[];
  errMess: string;
  
  constructor(private dishService: DishService,
    @Inject('BaseURL') private baseURL) {
      console.log("BASE..."+ baseURL);
     }
  
  ngOnInit() {
    this.dishService.getDishes()
    .subscribe((dishes) => this.dishes = dishes,
      errmess=>this.errMess=<any>errmess
      );
      console.log("Mensaje error: " + this.errMess);
    //this.dishes = this.dishService.getDishes();
    //this.dishService.getDishes().then(dishes => this.dishes = dishes);
  }

}
