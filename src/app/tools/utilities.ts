export class Utilities{
    static trianglePoints(x1, y1, x2, y2, x3, y3){
        return x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3;
    }

    static round(value, decimals) {
        return Number(Math.round(Number(value+"e"+decimals))+'e-'+decimals);
      }
}