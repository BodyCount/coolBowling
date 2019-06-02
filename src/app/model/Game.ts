import { Frame } from './Frame';
import GameConfig from './GameConfig';

export enum GameState {
    Started,
    LastFrame,
    Ended
}

export function getGameState(frame: Frame): GameState {
    switch (frame.number) {
        case GameConfig.maxFrames:
            return GameState.Ended
        case GameConfig.maxFrames - 1:
            return GameState.LastFrame
        default:
            return GameState.Started
    }
}