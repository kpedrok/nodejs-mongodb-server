import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-comment",
  templateUrl: "comment.html",
})
export class CommentPage {
  comment: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder
  ) {
    this.comment = this.formBuilder.group({
      author: ["", Validators.required],
      rating: ["", Validators.required],
      comment: ["", Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CommentPage");
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    this.viewCtrl.dismiss(this.comment.value);
  }
}
