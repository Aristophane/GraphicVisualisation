import { Coordinates } from './coordinates';
import { SolarSystem } from './solarSystem';

export class CanvasAnimation {
    private readonly ctx: CanvasRenderingContext2D;
    private solarSystem : SolarSystem;
    private i : number = 0;
    private j: number = 0;
    private k: number = 0;
    private l: number = 0;
    private coordinates: Coordinates = new Coordinates(75, 75);
    private coordinates2: Coordinates = new Coordinates(300, 75);
    private coordinates3: Coordinates = new Coordinates(300, 300);
    private coordinates4: Coordinates = new Coordinates(75, 300);
    private width = 70;

    constructor(private readonly canvas: HTMLCanvasElement) {
      this.ctx = this.canvas.getContext('2d');
    //   this.solarSystem = new SolarSystem(this.ctx);
      window.requestAnimationFrame(() => this.draw());
    }
  
    draw() {
    //  this.solarSystem.drawSolarSystem();
        this.drawCircleWithLine(this.coordinates, this.width, this.i);
        this.drawCircleWithLine(this.coordinates2, this.width, this.j);
        this.drawCircleWithLine(this.coordinates3, this.width, this.k);
        this.drawCircleWithLine(this.coordinates4, this.width, this.l);
        window.requestAnimationFrame(() => this.draw());
    }

    drawCircleWithLine(center : Coordinates, width: number, angle: number){
        this.ctx.clearRect(center.x - width -1 , center.y - width -1 , width *2 +2  , width *2 +2 );
        this.ctx.strokeStyle = 'black';
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, width, 0, Math.PI * 2, true);
        this.ctx.stroke();
        this.ctx.closePath();
        
        this.ctx.save();
        this.ctx.translate(center.x, center.y);
        this.ctx.rotate((angle) * Math.PI / 180);
        this.ctx.beginPath();
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(0, width);
        this.ctx.stroke();
        this.ctx.restore();

    }
  }