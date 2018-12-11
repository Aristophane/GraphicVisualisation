import { Note } from "../model/note";

export class GammesUtilities{

    public static findNoteFromAngle(angle: number, gamme: Note[]) {
        var modAngle = angle;       

        if (angle > 360) {
            modAngle = angle % 360;
        }

        var i = gamme.length;

        while(true)
        {
            if (modAngle >= gamme[i - 1].angle)
            {
                return gamme[i-1];
            }
            i--;
        }
    }

    public static findNoteEnglishNameFromAngle(angle: number, gamme: Note[]) {
        var modAngle = angle;       

        if (angle > 360) {
            modAngle = angle % 360;
        }

        var i = gamme.length;

        while(true)
        {
            if (modAngle >= gamme[i - 1].angle)
            {
                return gamme[i-1].englishName;
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

    public static getEnglishNoteName(gamme: Note[], position: number, pitch: number){
        if(position > gamme.length - 1){
          var modulatedPosition = position % gamme.length;
          return gamme[modulatedPosition].englishName + (pitch + 1).toString();
        }
        else if(Math.abs(position) == gamme.length){
          return gamme[0].englishName + (pitch - 1).toString();
        }
        else if(position < 0){
          var modulatedPosition = gamme.length + position % gamme.length;
          return gamme[modulatedPosition].englishName + (pitch - 1).toString();
        }
        else{
          return gamme[position].englishName + (pitch).toString();
        }
      }
}