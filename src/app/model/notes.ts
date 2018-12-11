import { Note } from "./note";

export class Notes{
    public static C: Note = {angle: 0, englishName: "C", frenchName: "Do" };
    public static Db: Note = {angle: 60, englishName: "Db", frenchName: "Reb" };
    public static D: Note = {angle: 60, englishName: "D", frenchName: "Re" };
    public static Eb: Note = {angle: 90, englishName: "Eb", frenchName: "Mib" };
    public static E: Note = {angle: 120, englishName: "E", frenchName: "Mi" };
    public static F: Note = {angle: 150, englishName: "F", frenchName: "Fa" };
    public static Gb: Note = {angle: 180, englishName: "Gb", frenchName: "Solb" };
    public static G: Note = {angle: 210, englishName: "G", frenchName: "Sol" };
    public static Ab: Note = {angle: 240, englishName: "Ab", frenchName: "Lab" };
    public static A: Note = {angle: 270, englishName: "A", frenchName: "La" };
    public static Bb: Note = {angle: 300, englishName: "Bb", frenchName: "Sib" };
    public static B: Note = {angle: 330, englishName: "B", frenchName: "Si" };
}