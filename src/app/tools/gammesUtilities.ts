import { Gammes } from "../model/gammes";
import { Note } from "../model/note";

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

    public static findNoteFromEnglishName(englishName: string, gamme: Note[]){
        for(var i = 0; i < gamme.length; i++){
            if(gamme[i].englishName == englishName)
            {
                return gamme[i];
            }
        }

        return null;
    }

    public static findNotePositionFromEnglishName(englishName: string, gamme: Note[]){
        for(var i = 0; i < gamme.length; i++){
            if(gamme[i].englishName == englishName)
            {
                return i;
            }
        }

        return null;
    }
}