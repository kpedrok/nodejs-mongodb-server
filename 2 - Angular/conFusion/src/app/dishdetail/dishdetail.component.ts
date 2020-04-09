import { Location } from '@angular/common'
import { Component, Inject, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { DishService } from '../services/dish.service'
import { Dish } from '../shared/dish'
import { ContactType } from '../shared/feedback'
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('baseURL') private baseURL
  ) {
    this.createForm()
  }
  dish: Dish
  dishIds: string[]
  prev: string
  next: string
  errMess: string

  // Comments form
  @ViewChild('fform') feedbackFormDirective
  feedbackForm: FormGroup
  feedback
  contactType = ContactType

  formErrors = {
    author: '',
    rating: '',
    comment: ''
  }

  validationMessages = {
    author: {
      required: 'First Name is required.',
      minlength: 'First Name must be at least 2 characters long.',
      maxlength: 'FirstName cannot be more than 25 characters long.'
    }
  }

  ngOnInit() {
    this.dishservice
      .getDishIds()
      .subscribe(dishIds => (this.dishIds = dishIds))
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishservice.getDish(params['id']))
      )
      .subscribe(dish => {
        this.dish = dish
        this.setPrevNext(dish.id)
      }, errmess => this.errMess = <any>errmess)
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId)
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ]
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ]
  }

  goBack(): void {
    this.location.back()
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      author: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(25)]
      ],
      rating: ['', Validators.required],
      comment: ['', Validators.required]
    })
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data))
    this.onValueChanged() // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return
    }
    const form = this.feedbackForm
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = ''
        const control = form.get(field)
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field]
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' '
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value
    console.log(this.feedback)
    this.feedbackForm.reset({
      author: '',
      rating: '',
      comment: ''
    })
    const newComment = {
      author: this.feedback.author,
      rating: this.feedback.rating,
      comment: this.feedback.comment,
      date: new Date().toISOString()
    }
    this.dish.comments.push(newComment)
    this.feedbackFormDirective.resetForm()
  }

  formatLabel(value: number) {
    return value
  }
}
