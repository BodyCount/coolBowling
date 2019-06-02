import GameConfig from './GameConfig';

export type FrameMark = "Open" | "Strike" | "Spare"

export type Roll = number

export type Rolls = [Roll, Roll?, Roll?] // is it necessary? Still, explicitly saying that there is max of three rolls

export interface Frame {
    number: number
    mark: FrameMark
    rolls: Rolls
    totalScore: number
}


export function getFrameMarkFromRolls(...rolls: Roll[]): FrameMark {
    const [firstRoll, secondRoll] = rolls;

    if (firstRoll === GameConfig.strikeScore) {
        return "Strike"
    }

    const scoreFromRolls = firstRoll + secondRoll;

    if (scoreFromRolls === GameConfig.spareScore) {
        return "Spare"
    }

    return "Open"
}