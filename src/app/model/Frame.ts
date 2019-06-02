import GameConfig from './GameConfig';

export enum FrameMark {
    Strike="Strike",
    Spare="Spare",
    Open="Open"
}

export type Roll = number

export type Rolls = [Roll, Roll?, Roll?] // is it necessary? Still, explicitly saying that there is max of three rolls


export interface Frame {
    number: number
    mark: FrameMark
    rolls: Rolls
    totalScore: number,
    requiredRecounts: number;
}

export function getFrameMarkFromRolls(...rolls: Roll[]): FrameMark {
    const [firstRoll, secondRoll] = rolls;

    if (firstRoll === GameConfig.strikeScore) {
        return FrameMark.Strike
    }

    const scoreFromRolls = firstRoll + secondRoll;
    if (scoreFromRolls === GameConfig.spareScore) {
        return FrameMark.Spare
    }

    return FrameMark.Open
}

export function getRequiredRecountsFromMark(mark: FrameMark): number {
    switch (mark) {
        case FrameMark.Strike:
            return 2;
        case FrameMark.Spare:
            return 1;
        default:
            return 0;
    }

}