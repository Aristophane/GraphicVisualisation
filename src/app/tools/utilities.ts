import { Angle } from "../model/angle";

export class Utilities{
    
    static trianglePoints(x1, y1, x2, y2, x3, y3){
        return x1 + "," + y1 + " " + x2 + "," + y2 + " " + x3 + "," + y3;
    }

    static round(value, decimals) {
        return Number(Math.round(Number(value+"e"+decimals))+'e-'+decimals);
      }

    
    static angleListCreator(subdision: number){
        let interval: number = 360/subdision;
        let angleValue = interval;
        let iterator: number = 1;
        let returnList : Angle[] = [{degreeValue: 0}];
        while(angleValue < 360){
            returnList[iterator] = {degreeValue: angleValue};
            angleValue += interval;
            iterator += 1;
        }
        
        return returnList;
    }
}