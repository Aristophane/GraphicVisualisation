import { Component, OnInit } from '@angular/core';
import { Coordinates } from '../model/coordinates';
import { Angles } from '../model/angles';
import { Gammes } from '../model/gammes';
import { Utilities } from '../tools/utilities';


@Component({
  selector: 'musical-rose',
  templateUrl: './musical-rose.component.html',
  styleUrls: ['./musical-rose.component.css']
})
export class MusicalRoseComponent implements OnInit {

  center: Coordinates;
  size: number;
  angles = Angles.windRoseAngles;
  notes = Gammes.gammeMajeure;
  arrowAngle: string;
  arrowSize: number;

  constructor() {
    this.size = 320;
    this.center = new Coordinates(this.size/2, this.size/2);
    setInterval(()=> this.windEffect(), 42);
    this.arrowSize = 100;
   }

  ngOnInit() {
  }

  triangleRightPoints(size: string)
  {
    var convertedSize = parseInt(size);
    return Utilities.trianglePoints(this.center.x + 13, this.center.y, this.center.x, this.center.y - convertedSize, this.center.x, this.center.y);
  }

  triangleLeftPoints(size: string){
    var convertedSize = parseInt(size);
    return Utilities.trianglePoints(this.center.x - 13, this.center.y, this.center.x, this.center.y - convertedSize, this.center.x, this.center.y);
  }

  arrowHead(){
    return Utilities.trianglePoints(this.center.x, this.center.y - this.arrowSize - 10, this.center.x + 5, this.center.y - this.arrowSize + 10, this.center.x - 5, this.center.y - this.arrowSize + 10);
  }

  getTransform(angle: string)
  {
    return "rotate(" + angle + ", "+ this.center.x + "," + this.center.y +")";
  }

  windEffect(){
    this.arrowAngle = this.getTransform(("80"+ Utilities.round(Math.random()*1.5,2).toString()));
  }
}
