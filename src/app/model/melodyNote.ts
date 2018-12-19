export class MelodyNote{
    positionInScale: number;
    startTime: string;
    duration: string;

    constructor(melodyNote: MelodyNote){
        this.positionInScale = melodyNote.positionInScale;
        this.startTime = melodyNote.startTime;
        this.duration = melodyNote.duration;
    }
}