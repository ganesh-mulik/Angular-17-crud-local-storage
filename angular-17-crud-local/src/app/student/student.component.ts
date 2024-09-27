import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  userObj: USER = new USER();

}

export class USER{
  userId: number;
  fname: string;
  lname: string;
  username: string;
  city: string;
  state: string;
  zipcode: number;
  
  constructor(){
    this.userId = 0;
  this.fname = "";
  this.lname = "";
  this.username = "";
  this.city = "";
  this.state = "";
  this.zipcode = 0;
  }
}
