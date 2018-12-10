import { Gammes } from "../model/gammes";

export class GammesUtilities{

    public static findNoteFromAngle(angle: number) {
        var modAngle = angle;       

        if (angle > 360) {
            modAngle = angle % 360;
        }

        console.log("modAngle: " + modAngle );

        var i = Gammes.gammeMajeure.length;

        while(true)
        {
            if (modAngle >= Gammes.gammeMajeure[i - 1].angle)
            {
                return Gammes.gammeMajeure[i-1].englishName;
            }
            i--;
        }
    }
}