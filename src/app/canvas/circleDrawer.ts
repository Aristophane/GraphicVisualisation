import { IWeather } from '../model/weather';
import { Coordinates } from '../model/coordinates';

export class CircleDrawer{
    private readonly ctx: CanvasRenderingContext2D;
    private coordinates: Coordinates = new Coordinates(75, 75);
    private width = 70;

    public weatherInfos : IWeather[];

    constructor(private readonly canvas: HTMLCanvasElement) {
      this.ctx = this.canvas.getContext('2d');
    }

    draw(angle: number) {
        this.drawCircleWithLine(this.coordinates, this.width, angle);
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
        this.ctx.lineTo(0, - width);
        this.ctx.stroke();
        this.ctx.restore();

    }
  }