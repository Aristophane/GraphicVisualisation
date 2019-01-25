import { Component, OnInit, AfterViewInit, Input, OnChanges } from '@angular/core';
import { Coordinates } from '../model/coordinates';
import { Angles } from '../model/angles';
import { Utilities } from '../tools/utilities';
import { Note } from '../model/note';

@Component({
  selector: 'musical-rose-tahiti',
  templateUrl: './musical-rose-tahiti.component.html',
  styleUrls: ['./musical-rose-tahiti.component.css']
})
export class MusicalRoseTahitiComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() baseAngle: number;
  @Input() notes: Note[];

  ngOnChanges(){
      this.moveArrowAngle(this.baseAngle);
  }

  center: Coordinates;
  size: number;
  angles;
  blackTriangleAngles;
  smallAngles;
  mediumAngles;
  arrowAngle: string;
  arrowSize: number;
  movement = 0;

  constructor() {
    this.size = 320;
    this.center = new Coordinates(this.size/2, this.size/2);
    this.arrowSize = 120;
  }

  ngOnInit() {
    this.angles = Utilities.angleListCreator(16);
    this.smallAngles = Utilities.angleListCreator(256);
    this.mediumAngles = Utilities.angleListCreator(64);
    this.blackTriangleAngles = Utilities.angleListCreator(8);
  }

  ngAfterViewInit(){
  }

  triangleRightPoints(hauteur: string, base: string)
  {
    var convertedHauteur = parseInt(hauteur);
    var convertedBase = parseInt(base);
    return Utilities.trianglePoints(this.center.x + convertedBase, this.center.y, this.center.x, this.center.y - convertedHauteur, this.center.x, this.center.y);
  }

  triangleLeftPoints(hauteur: string, base :string){
    var convertedHauteur = parseInt(hauteur);
    var convertedBase = parseInt(base);
    return Utilities.trianglePoints(this.center.x - convertedBase, this.center.y, this.center.x, this.center.y - convertedHauteur, this.center.x, this.center.y);
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
