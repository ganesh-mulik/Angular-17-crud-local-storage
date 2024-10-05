import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule,AsyncPipe],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{
  disableForm:boolean = false;
  http = inject(HttpClient);
  userObj: USER = new USER();
  cityList$: Observable<any[]> = new Observable<any[]>();
  stateList$: Observable<any[]> = new Observable<any[]>();
  userList:USER[]=[];
  
  ngOnInit(): void {
      this.cityList$ = this.http.get<any[]>("http://localhost:3000/cityList");
      this.stateList$ = this.http.get<any[]>("http://localhost:3000/stateList");
      this.getUsers();
  }
  showForm(value:number){
    value?this.disableForm = true:this.disableForm=false;
  }
  getUsers(){
    this.http.get<USER[]>("http://localhost:3000/userList").subscribe((res:USER[])=>{
      this.userList = res;
    })
  }
  onSaveUser(){
    this.http.get<USER>("http://localhost:3000/createUser").subscribe(
      (res:USER)=>{
        alert("new user created successfully!");
        this.userList.push(this.userObj);
      }
    )
  }
  onDeleteUser(id:number){
        const isDelete = confirm("Are you sure to delete record?");
        if(isDelete){
          this.http.get<USER>("http://localhost:3000/deleteUser").subscribe(
            (res:USER)=>{
              alert("User Record deleted successfully!");
              this.userList.slice(this.userObj.userId);
            }
          )
        }
  }
  onUpdate(data:USER){
    this.userObj = data;
  }
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
