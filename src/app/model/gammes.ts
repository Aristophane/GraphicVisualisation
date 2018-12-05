import { Note } from "./note";

export class Gammes{
    // les gammes sont exprimées en angles
    public static diatoniqueMajeureMap : Map<number,string> = new Map([[0, "C"], [60, "D"], [120, "E"], [150, "F"],[210, "G"] ,[270, "A"] ,[330, "B"]]);

    public static gammeMajeure : Note[] = [
        {angle: 0, englishName: "C", frenchName: "Do" },
        // {angle: 60, englishName: "D", frenchName: "Re" },
        {angle: 120, englishName: "E", frenchName: "Mi" },
        {angle: 150, englishName: "F", frenchName: "Fa" },
        {angle: 210, englishName: "G", frenchName: "Sol" },
        // {angle: 270, englishName: "A", frenchName: "La" },
        {angle: 330, englishName: "B", frenchName: "Si" }
    ];
}