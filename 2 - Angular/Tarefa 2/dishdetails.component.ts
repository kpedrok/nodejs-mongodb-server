import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
const DISH = {
  id: '0',
  name: 'Uthappizza',
  image: '/assets/images/uthappizza.png',
  category: 'mains',
  featured: true,
  label: 'Hot',
  price: '4.99',

  description:
    // tslint:disable-next-line: max-line-length
    'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
  comments: [
    {
      rating: 5,
      comment: 'Imagine all the eatables, living in conFusion!',
      author: 'John Lemon',
      date: '2012-10-16T17:57:28.556094Z'
    },
    {
      rating: 4,
      comment:
        'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
      author: 'Paul McVites',
      date: '2014-09-05T17:57:28.556094Z'
    },
    {
      rating: 3,
      comment: 'Eat it, just eat it!',
      author: 'Michael Jaikishan',
      date: '2015-02-13T17:57:28.556094Z'
    },
    {
      rating: 4,
      comment: 'Ultimate, Reaching for the stars!',
      author: 'Ringo Starry',
      date: '2013-12-02T17:57:28.556094Z'
    },
    {
      rating: 2,
      comment: 'It\'s your birthday, we\'re gonna party!',
      author: '25 Cent',
      date: '2011-12-02T17:57:28.556094Z'
    }
  ]
};
@Component({
  selector: 'app-dishdetails',
  templateUrl: './dishdetails.component.html',
  styleUrls: ['./dishdetails.component.scss']
})
export class DishdetailsComponent implements OnInit {
  dish = DISH;
  formBuilder = new FormBuilder();
  myForm: FormGroup;
  comment;
  formErrors = {
    author: '',
    comment: ''
  };

  validationMessages = {
    author: {
      required: 'Name is required.',
      minlength: 'Name must be at least 2 characters long.'
    },
    comment: {
      required: 'Comment is required.'
    }
  };
  constructor() { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      author: ['', Validators.required, Validators.minLength(2)],
      ratings: [5, Validators.required],
      comments: ['', Validators.required]
    });
    this.myForm.get('author').valueChanges.subscribe(data => {
      this.formValidation(data);
    }

    );
  }
  formValidation(data?: any) {
    if (!this.myForm) { return; }
    const form = this.myForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) { // here must be: if (messages.hasOwnProperty(key))
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  save() {
    const isoDate = new Date().toISOString();
    const obj = {
      rating: this.myForm.get('rating').value,
      comment: this.myForm.get('comments').value,
      author: this.myForm.get('author').value,
      date: isoDate
    };
    this.dish.comments.push(obj);
    this.myForm.reset();
  }
}
