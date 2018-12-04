import { GammesUtilities } from './../tools/gammesUtilities';
import { Synth } from './../tools/synth';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Coordinates } from '../model/coordinates';
import { Angles } from '../model/angles';
import { Gammes } from '../model/gammes';
import { Utilities } from '../tools/utilities';

@Component({
  selector: 'musical-rose',
  templateUrl: './musical-rose.component.html',
  styleUrls: ['./musical-rose.component.css']
})
export class MusicalRoseComponent implements OnInit, AfterViewInit {

  @Input() baseAngle: number;

  center: Coordinates;
  size: number;
  angles = Angles.windRoseAngles;
  notes = Gammes.gammeMajeure;
  arrowAngle: string;
  arrowSize: number;
  synth: Synth;

  constructor() {
    this.size = 320;
    this.center = new Coordinates(this.size/2, this.size/2);
    this.arrowSize = 100;
    this.synth = new Synth();
   }

  ngOnInit() {
  }

  ngAfterViewInit(){
    setInterval(() => this.windEffect(), 42);
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

  note = "C";

  windEffect(){
    var approxWindAngle = this.baseAngle + Utilities.round(Math.random() * 0.5, 2);

    if (this.note != GammesUtilities.findNoteFromAngle(this.baseAngle))
    {
      this.note = GammesUtilities.findNoteFromAngle(this.baseAngle)    
      this.synth.playNote(this.note);
    }
    this.arrowAngle = this.getTransform(approxWindAngle.toString());
  }
}
