import { Angle } from "./angle";

export class Angles{

    public static windRoseAngles : Angle[] = [
        {degreeValue: 0, magneticName: "N"},
        {degreeValue: 22.5, magneticName: "NNE"},
        {degreeValue: 45, magneticName: "NE"},
        {degreeValue: 67.5, magneticName: "ENE"},
        {degreeValue: 90, magneticName: "E"},
        {degreeValue: 112.5, magneticName: "ESE"},
        {degreeValue: 135, magneticName: "SE"},
        {degreeValue: 157.5, magneticName: "SSE"},
        {degreeValue: 180, magneticName: "S"},
        {degreeValue: 202.5, magneticName: "SSO"},
        {degreeValue: 225, magneticName: "SO"},
        {degreeValue: 247.5, magneticName: "OSO"},
        {degreeValue: 270, magneticName: "O"},
        {degreeValue: 292.5, magneticName: "ONO"},
        {degreeValue: 315, magneticName: "NO"},
        {degreeValue: 337, magneticName: "NNO"}
    ];

    public static eightAngles : Angle[] = [
        {degreeValue: 0, magneticName: "N"},
        {degreeValue: 45, magneticName: "NE"},
        {degreeValue: 90, magneticName: "E"},
        {degreeValue: 135, magneticName: "SE"},
        {degreeValue: 180, magneticName: "S"},
        {degreeValue: 225, magneticName: "SO"},
        {degreeValue: 270, magneticName: "O"},
        {degreeValue: 315, magneticName: "NO"}
    ];

    /**
     * Transform any angle value in its base relative
     * @param angle in degree
     * @param base in degree (i.e. 360)
     */
    public static normalizeAngle(angle: number, base: number){
        var modAngle = angle;

        if (angle > base || angle < base) {
          modAngle = Math.abs(angle) % base;
        }
        
        return modAngle;
    }

}
    
