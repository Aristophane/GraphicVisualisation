import { Component, OnInit, AfterViewInit, Input, OnChanges } from '@angular/core';
import { Coordinates } from '../model/coordinates';
import { Angles } from '../model/angles';
import { Gammes } from '../model/gammes';
import { Utilities } from '../tools/utilities';

@Component({
  selector: 'musical-rose',
  templateUrl: './musical-rose.component.html',
  styleUrls: ['./musical-rose.component.css']
})
export class MusicalRoseComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() baseAngle: number;

  ngOnChanges(){
      this.moveArrowAngle(this.baseAngle);
  }

  center: Coordinates;
  size: number;
  angles = Angles.windRoseAngles;
  notes = Gammes.gammeMajeure;
  arrowAngle: string;
  arrowSize: number;

  constructor() {
    this.size = 320;
    this.center = new Coordinates(this.size/2, this.size/2);
    this.arrowSize = 100;
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
  }

  triangleRightPoints(hauteur: string)
  {
    var convertedSize = parseInt(hauteur);
    var baseSize = 13;
    return Utilities.trianglePoints(this.center.x + baseSize, this.center.y, this.center.x, this.center.y - convertedSize, this.center.x, this.center.y);
  }

  triangleLeftPoints(hauteur: string){
    var convertedSize = parseInt(hauteur);
    var baseSize = 13;
    return Utilities.trianglePoints(this.center.x - baseSize, this.center.y, this.center.x, this.center.y - convertedSize, this.center.x, this.center.y);
  }

  arrowHead(){
    return Utilities.trianglePoints(this.center.x, this.center.y - this.arrowSize - 10, this.center.x + 5, this.center.y - this.arrowSize + 10, this.center.x - 5, this.center.y - this.arrowSize + 10);
  }

  getTransform(angle: string)
  {
    return "rotate(" + angle + ", "+ this.center.x + "," + this.center.y +")";
  }

  moveArrowAngle(angle: number){
    // var approxWindAngle = this.baseAngle + Utilities.round(Math.random() * 0.5, 2);
    this.arrowAngle = this.getTransform(angle.toString());
  }
}
