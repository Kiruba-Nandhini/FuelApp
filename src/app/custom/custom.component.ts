import { Component, OnInit } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLiteObject } from '@ionic-native/sqlite';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
})
export class CustomComponent implements OnInit {
  databaseObj: SQLiteObject;
  row_data: any = [];
  readonly database_name: string = 'kiru.db';
  readonly table_name: string = 'mytest';
  Date: any;
  numbers: any;
  dateList;
  avg;
  final: any[];
  usersList;
  constructor(private sqlite: SQLite, private navigation: NavController) {}

  ngOnInit() {}

  add_data() {
    this.sqlite
      .create({
        name: this.database_name,
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        // alert(' Database Created!');
        this.select_data();
      })
      .catch((e) => {
        alert('error ' + JSON.stringify(e));
      });
  }
  select_data() {
    this.databaseObj
      .executeSql(
        `
  SELECT * FROM ${this.table_name}
  `,
        []
      )
      .then((res) => {
        this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.row_data.push(res.rows.item(i));
          }
          console.log(this.row_data);
        }
      })
      .catch((e) => {
        alert('error ' + JSON.stringify(e));
      });
  }
  fuelPage() {
    this.navigation.navigateForward('/fuel-page');
  }
}
