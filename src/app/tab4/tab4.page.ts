import { Component, OnInit } from '@angular/core';
interface FileData {
  url: string;
  name: string;
}
const dbName ='myDatabase';
const dbVersion = 1;
const storeName = 'images';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  public files: FileData[] = [];

  private db!: IDBDatabase;

  constructor() { }

  ngOnInit() {
    this.openDatabase();
  }
  openDatabase() {
    const request= indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded =  (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      this.db.createObjectStore(storeName, {keyPath: 'name'});
    };
  }
  loadImageFromDevice($event: any) {
    const file = $event.target.file[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      //get the data URL  of the image:
      let DataURL:string = reader.result as string;

      //add the file data to localStorage
      localStorage.setItem(file.name, DataURL);

      //add the file data to the array of files
      this.files.push({ url: DataURL, name: file.name});
    };
    reader.onerror = (error) => {
      //handle errors
    };
  }
}
