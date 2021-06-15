import { Component, OnInit } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLiteObject } from '@ionic-native/sqlite';
import { NavController } from '@ionic/angular';
import { TranslateFilesService } from '../services/translate-files.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  databaseObj: SQLiteObject;
  row_data: any = [];
  readonly database_name: string = 'kiru.db';
  readonly table_name: string = 'mytest';
  Date: any;
  numbers: any;
  totalList;
  httpList;
  odomilage;
  avgAmount;
  odoList;
  fuelVol;
  fuelList;
  final: any[];
  selectedLanguage: string;
  tot: any;

  constructor(
    private http: HttpClient,
    private Translate: TranslateFilesService,
    private sqlite: SQLite,
    private navigation: NavController
  ) {
    this.selectedLanguage = this.Translate.getDefaultLanguage();
  }
  languageChanged() {
    this.Translate.setLanguage(this.selectedLanguage);
  }

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
    console.log('data retrived');
  }

  num(date) {
    this.add_data();

    this.numbers = date;
    this.totalList = [];
    this.avgAmount = [];
    this.final = [];
    this.odoList = [];
    this.odomilage = [];
    this.fuelList = [];
    var temp = 0,
      temp1 = 0,
      temp2 = 0;
    for (let i = 0; i < this.row_data.length; i++) {
      var month = this.row_data[i]['Date'][5] + this.row_data[i]['Date'][6];
      console.log(month);

      if (month == this.numbers) {
        this.final.push(this.row_data[i]);
        console.log(this.final, 'monthDetails');

        for (var j = 0; j < this.final.length; j++) {
          var test = this.final[j]['TotalCost'];
          var odo = this.final[j]['Odometer'];
          var fuelVol = this.final[j]['FuelVolume'];

          if (j == 0) {
            temp = test;
            temp1 = odo;
            temp2 = fuelVol;
          } else {
            temp = temp + test;
            temp1 = temp1 + odo;
            temp2 = temp2 + fuelVol;
          }
        }
        this.totalList = temp;
        this.odomilage = temp1;
        this.fuelVol = temp2;
        this.avgAmount = this.totalList / j;
        this.odoList = this.odomilage / this.fuelVol;
        console.log('totalcost', this.totalList);
        console.log(this.odoList, 'odometr');
      }
    }
  }

  getApi(event) {
    return this.http
      .get<any>(
        'https://script.google.com/macros/s/AKfycby-z2D2qjco0MRdqsFjV3QBpYQ5BniqINmgenrIqyjUECJg1fRP2ou4Vtu4raQj6rR5/exec'
      )
      .subscribe((response) => {
        this.httpList = response;
        console.log(response, 'response');
        for (let i = 0; i < this.httpList.length; i++) {
          this.tot =
            this.httpList[i]['VolumeInLitres'] *
            this.httpList[i]['FuelPriceInLitre'];
          console.log(this.tot);
          this.httpList[i]['total'] = this.tot;
          console.log(this.httpList, 'httplist');
        }
        this.add_data();

        setTimeout(() => {
          event.target.complete();
        }, 2000);
      });
  }
}
