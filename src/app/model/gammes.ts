import { Note } from "./note";
import { Notes } from "./notes";

export class Gammes{

    public static gammeMajeure : Note[] = [
        Notes.C,
        Notes.D,
        Notes.E,
        Notes.F,
        Notes.G,
        Notes.A,
        Notes.B
    ];

    public static gammeMineureNaturelle : Note[] = [
        Notes.C,
        Notes.D,
        Notes.Eb,
        Notes.F,
        Notes.G,
        Notes.Ab,
        Notes.Bb
    ];

    public static gammeMineureHarmonique : Note[] = [
        Notes.C,
        Notes.D,
        Notes.Eb,
        Notes.F,
        Notes.G,
        Notes.Ab,
        Notes.B
    ];

    public static gammePentaChinoise : Note[] = [
        Notes.C,
        Notes.D,
        Notes.E,
        Notes.G,
        Notes.A
    ];

    public static gammePentaEgyptienne : Note[] = [
        Notes.C,
        Notes.D,
        Notes.F,
        Notes.G,
        Notes.Bb
    ];
}