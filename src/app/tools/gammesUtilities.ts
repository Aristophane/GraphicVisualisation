import { Gammes } from "../model/gammes";

export class GammesUtilities{

    public static findNoteFromAngle(angle: number){
        var previousNoteInScale : string;

        for (var [angleKey, noteValue] of Gammes.diatoniqueMajeureMap){
                if(angle == angleKey){
                    console.log("returning Value: " + noteValue);
                    return noteValue;
                }    
                else if(angle < angleKey)
                    {
                        console.log("returning Value: " + previousNoteInScale);
                        return previousNoteInScale;
                    }
                previousNoteInScale = noteValue;
           }
    }
}