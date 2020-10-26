/*
Santizo Galicia Jessica

*/
import { Component, OnInit, Input , ViewChild, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment} from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  @ViewChild('form') feedbackFormDirective;

  feedbackFormComment: FormGroup;
  comment: Comment;
  isValid = false;
  errMess: string;
  
  formErrors = {
    'author': '',
    'comment': ''
  };
  validationMessages = {
    'author': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.'
    }
  }

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
      this.createForm();
    }

    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },
      errmess => this.errMess = <any>errmess
      );
    }

    public createForm(){
      this.feedbackFormComment = this.fb.group({
        rating: 5,
        comment: ['', [Validators.required]],
        author: ['', [Validators.required, Validators.minLength(2)] ],
        date : ''
      });

      this.feedbackFormComment.valueChanges
      .subscribe(data => this.onValueChanged(data));
      
    }

    public onValueChanged(data?: any){
      if (!this.feedbackFormComment) { return; }
      const form = this.feedbackFormComment;
      if(form.invalid) { //Status invalid
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
    }else{
      //assigning the values if these are correct and show them
      this.comment = this.feedbackFormComment.value;

    }
  }

    onSubmit() {

      this.comment = this.feedbackFormComment.value;
      this.comment.date = new Date().toISOString();
      this.dish.comments.push(this.comment);
      this.feedbackFormDirective.resetForm();
      this.feedbackFormComment.reset({
        rating: 5,
        comment: '',
        author: '',
        date : ''
      });
      
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
