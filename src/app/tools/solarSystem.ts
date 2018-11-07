export class SolarSystem {
    private readonly ctx: CanvasRenderingContext2D;
  
    sun: HTMLImageElement;
    moon: HTMLImageElement;
    earth: HTMLImageElement;

    constructor(private context : CanvasRenderingContext2D){
        this.ctx = this.context;
        this.init();
    }

    init(){
        this.sun = new Image();
        this.moon = new Image();
        this.earth = new Image();
        this.sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_this.sun.png';
        this.moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_this.moon.png';
        this.earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_this.earth.png';
    }

    drawSolarSystem(){
        this.ctx.globalCompositeOperation = 'destination-over';
        this.ctx.clearRect(0, 0, 400, 400); // clear canvas
      
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        this.ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
        this.ctx.save();
        this.ctx.translate(150, 150);
      
        // this.earth
        var time = new Date();
        this.ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
        this.ctx.translate(105, 0);
        this.ctx.fillRect(0, -12, 50, 24); // Shadow
        this.ctx.drawImage(this.earth, -12, -12);
      
        // this.moon
        this.ctx.save();
        this.ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
        this.ctx.translate(0, 28.5);
        this.ctx.drawImage(this.moon, -3.5, -3.5);
        this.ctx.restore();
      
        this.ctx.restore();
        
        this.ctx.beginPath();
        this.ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // this.earth orbit
        this.ctx.stroke();
       
        this.ctx.drawImage(this.sun, 0, 0, 300, 300);
    }

}