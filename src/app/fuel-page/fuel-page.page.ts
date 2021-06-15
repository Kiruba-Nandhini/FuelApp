import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from '@ionic/angular';
import { TranslateFilesService } from '../services/translate-files.service';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-fuel-page',
  templateUrl: './fuel-page.page.html',
  styleUrls: ['./fuel-page.page.scss'],
})
export class FuelPagePage implements OnInit {

  databaseObj: SQLiteObject;
  readonly database_name: string = 'kiru.db';
  readonly table_name: string = 'mytest';
  row_data: any = [];
  updateActive: boolean;
  to_update_item: any;
  date: number;
  odometer: number;
  volume: number;
  price: number;
  cost: number;
  bunkName: string;
  userNote: FormGroup;
  selectedLanguage: string;

  currentLatitude: number;
  currentLongitude: number;

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  address: string;
  constructor(
    private Translate: TranslateFilesService,
    private platform: Platform,
    private sqlite: SQLite,
    private navigate: NavController,
    private nativeGeocoder: NativeGeocoder,
    public fb: FormBuilder,
    private geoloc: Geolocation
  ) {
    this.platform
      .ready()
      .then(() => {
        this.add();
      })
      .catch((error) => {
        console.log(error);
      });
    this.selectedLanguage = this.Translate.getDefaultLanguage();
  }
  languageChanged() {
    this.Translate.setLanguage(this.selectedLanguage);
  }
  ngOnInit() {
    this.userNote = this.fb.group({
      date: ['', [Validators.required]],
      Odometer: ['', [Validators.required]],
      FuelVolume: ['', [Validators.required]],
      fuelPrice: ['', [Validators.required]],
      Cost: ['', [Validators.required]],
      BunkName: ['', [Validators.required]],
      lat: ['', [Validators.required]],
      long: ['', [Validators.required]],
    });
  }

  add() {
    this.sqlite
      .create({
        name: this.database_name,
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        // alert(' Database Created!');
      })
      .catch((e) => {
        alert('error ' + JSON.stringify(e));
      });

    this.databaseObj
      .executeSql(
        `
  CREATE TABLE IF NOT EXISTS ${this.table_name}  (pid INTEGER AUTO_INCREMENT PRIMARY KEY, Date DATE,Odometer INTEGER,FuelVolume INTEGER,FuelPrice INTEGER,TotalCost INTEGER,BunkName varchar(32),latitude int, longitude int)
  `,
        []
      )
      .then(() => {
        // alert('Table Created!');
      })
      .catch((e) => {
        alert('error ' + JSON.stringify(e));
      });
    this.databaseObj
      .executeSql(
        `
      INSERT INTO ${this.table_name} (Date,Odometer,FuelVolume,FuelPrice,TotalCost,BunkName,latitude,longitude) VALUES ('${this.date}','${this.odometer}','${this.volume}','${this.price}','${this.cost}','${this.bunkName}','${this.currentLatitude}','${this.currentLongitude}')
    `,
        []
      )
      .then(() => {
        console.log('row inserted');
        console.log(this.currentLatitude);
        console.log(this.currentLongitude);
      })
      .catch((e) => {
        alert('error ' + JSON.stringify(e));
      });
    this.navigate.navigateBack('/tabs/tab2');
  }
 

 



  back() {
    this.navigate.navigateBack('/tabs/tab2');
  }

  getCost() {
    this.cost = this.volume * this.price;
    console.log(this.cost);
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  getBunkLoc() {
    this.geoloc.getCurrentPosition().then((resp) => {

      this.currentLatitude = resp.coords.latitude;
      this.currentLongitude = resp.coords.longitude;
      

      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);

    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  //Return Comma saperated address
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }

}
