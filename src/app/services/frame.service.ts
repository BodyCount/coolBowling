import { Injectable } from '@angular/core';
import { Frame, Roll, FrameMark, getFrameMarkFromRolls } from '../model/Frame';
import { Subject } from 'rxjs';
import { GameState, getGameState } from '../model/Game';

@Injectable({
	providedIn: 'root'
})
export class FrameService {
	
	framesChanger = new Subject<Frame>();
	gameStateChanger = new Subject<GameState>();

	private frames: Array<Frame> = [];
	private gameState: GameState = GameState.Started;

	addFrame(...rolls: Roll[]): void {
		const [firstRoll, secondRoll, thirdRoll] = rolls;

		const firstRollNumber = firstRoll ? Number(firstRoll) : 0;
		const secondRollNumber = secondRoll ? Number(secondRoll) : 0;
		const thirdRollNumber = thirdRoll ? Number(thirdRoll) : 0;

		const number = this.frames.length + 1;
		const mark: FrameMark = getFrameMarkFromRolls(firstRollNumber, secondRollNumber);
		const totalScore = firstRollNumber + secondRollNumber + thirdRollNumber;

		const frame: Frame = {
			number,
			rolls: [firstRoll, secondRoll, thirdRoll],
			mark,
			totalScore
		};

		console.log(frame);
		this.frames.push(frame)
		this.gameState = getGameState(frame);

		this.framesChanger.next(frame);
		this.gameStateChanger.next(this.gameState);
	}
}
