/*
Santizo Galicia Jessica
Example to add animations in order to improve the user experience 
*/
import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
import { Comment } from '../shared/comment';
//import { trigger, state, style, animate, transition } from '@angular/animations';
import {visibility, flyInOut, expand} from '../animations/app.animations';
=======
import { Comment} from '../shared/comment';
import {trigger, state, style, animate,transition} from '@angular/animations';
>>>>>>> ee2cac48e8c012b31efd8a4c54055ab7aa24d77a


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
<<<<<<< HEAD
  host: {
    '[@flyInOut]':'true',
    'style': 'display:block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
=======
  animations: [
    trigger('visibility', [
      state('shown', style({
          transform: 'scale(1.0)',
          opacity: 1
      })),
      state('hidden', style({
          transform: 'scale(0.5)',
          opacity: 0
      })),
      transition('* => *', animate('0.5s ease-in-out'))
  ])
>>>>>>> ee2cac48e8c012b31efd8a4c54055ab7aa24d77a
  ]
})

export class DishdetailComponent implements OnInit {

  @ViewChild('form') feedbackFormDirective;

  feedbackFormComment: FormGroup;
  comment: Comment;
  isValid = false;
  errMess: string;
<<<<<<< HEAD
  dishcopy: Dish;
  visibility = 'shown';

=======
  
>>>>>>> ee2cac48e8c012b31efd8a4c54055ab7aa24d77a
  formErrors = {
    'author': '',
    'comment': ''
  };
  validationMessages = {
    'author': {
      'required': 'Author Name is required.',
      'minlength': 'Author Name must be at least 2 characters long.',
      'maxlength': 'Author Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.'
    }
  }

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  dishcopy: Dish;
  visibility: 'shown';
 

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
    this.createForm();
  }

<<<<<<< HEAD
  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => {
      this.visibility = 'hidden';
      return this.dishservice.getDish(params['id']);
    }))
      .subscribe(dish => { 
        this.dish = dish; 
        this.dishcopy = dish;
        this.setPrevNext(dish.id); 
        this.visibility = 'shown'; },
        errmess => this.errMess = <any>errmess
      );
  }
=======
    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      /*this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id']) ))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });*/
      this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
        errmess => this.errMess = <any>errmess );
    }
>>>>>>> ee2cac48e8c012b31efd8a4c54055ab7aa24d77a

  public createForm() {
    this.feedbackFormComment = this.fb.group({
      rating: 5,
      comment: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      date: ''
    });

    this.feedbackFormComment.valueChanges
      .subscribe(data => this.onValueChanged(data));

  }

  public onValueChanged(data?: any) {
    if (!this.feedbackFormComment) { return; }
    const form = this.feedbackFormComment;
    if (form.invalid) { //Status invalid
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    } else {
      //assigning the values if these are correct and show them
      this.comment = this.feedbackFormComment.value;

    }
  }

  onSubmit() {

    this.comment = this.feedbackFormComment.value;
    this.comment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish;
        this.dishcopy = dish;
      },
        errmess => {
          this.dish = null;
          this.dishcopy = null;
          this.errMess = <any>errmess;
        });
    this.feedbackFormDirective.resetForm();
    this.feedbackFormComment.reset({
      rating: 5,
      comment: '',
      author: '',
      date: ''
    });

<<<<<<< HEAD
=======
      this.comment = this.feedbackFormComment.value;
      this.comment.date = new Date().toISOString();

      this.dishcopy.comments.push(this.comment);
      this.dishservice.putDish(this.dishcopy)
        .subscribe(dish=>{
          this.dish = dish;
          this.dishcopy = this.dishcopy;
        },
        errMess=>{this.dish = null;
        this.dishcopy = null;
        this.errMess = <any>errMess
      });

      this.feedbackFormDirective.resetForm();
      this.feedbackFormComment.reset({
        rating: 5,
        comment: '',
        author: '',
        date : ''
      });
      
>>>>>>> ee2cac48e8c012b31efd8a4c54055ab7aa24d77a
  }


  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);

    const prevVal = (this.dishIds.length + index - 1) % this.dishIds.length;

    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    /*const prevNext = (this.dishIds.length + index + 1) % this.dishIds.length;
    console.log("index: " + index);
    console.log("prevVal: " + prevVal);
    console.log("nextVal: " + prevNext);*/
  }
  goBack(): void {
    this.location.back();
  }

}
