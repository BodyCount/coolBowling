import { Injectable } from '@angular/core';
import { Frame, Roll, FrameMark, getFrameMarkFromRolls, getRequiredRecountsFromMark } from '../model/Frame';
import { Subject } from 'rxjs';
import { GameState, getGameState } from '../model/Game';

@Injectable({
	providedIn: 'root'
})
export class FrameService {
	
	framesChanger = new Subject<Frame[]>();
	gameStateChanger = new Subject<GameState>();
	totalScoreChanger = new Subject<number>();

	private frames: Array<Frame> = [];
	private gameState: GameState = GameState.Started;
	private totalScore = 0;

	addFrame(...rolls: Roll[]): void {
		const [firstRoll, secondRoll, thirdRoll] = rolls;

		const firstRollNumber = firstRoll ? Number(firstRoll) : 0;
		const secondRollNumber = secondRoll ? Number(secondRoll) : 0;
		const thirdRollNumber = thirdRoll ? Number(thirdRoll) : 0;

		const number = this.frames.length + 1;
		const mark: FrameMark = getFrameMarkFromRolls(firstRollNumber, secondRollNumber);
		const totalScore = firstRollNumber + secondRollNumber + thirdRollNumber;
		const requiredRecounts = getRequiredRecountsFromMark(mark);
		const frame: Frame = {
			number,
			rolls: [firstRollNumber, secondRollNumber, thirdRollNumber],
			mark,
			totalScore,
			requiredRecounts
		};

		this.frames.push(frame);
		this.recalculateFrameScores();
		this.recalculateTotalScore();

		this.gameState = getGameState(frame);
		
		this.framesChanger.next(this.frames);
		this.gameStateChanger.next(this.gameState);
		this.totalScoreChanger.next(this.totalScore);
	}

	// I've used this article to figure the rules: https://en.wikipedia.org/wiki/Strike_(bowling) [Consecutive strikes]
	private recalculateFrameScores() {
		this.frames.forEach((frame, index) => {
			if (frame.requiredRecounts === 0) {
				return;
			}
			
			let newTotalScore = frame.totalScore;
			let newRequiredRecounts = frame.requiredRecounts;
			if (frame.mark === FrameMark.Strike) {
				if (frame.requiredRecounts === 2) {
					const followingFrame = this.frames[index + 1];
					if (followingFrame) {
						if (followingFrame.mark === FrameMark.Strike) {
							newTotalScore += followingFrame.rolls[0];
							newRequiredRecounts--;
							const nextAfterFollowingFrame = this.frames[index + 2]
							if (nextAfterFollowingFrame) {
								newTotalScore += nextAfterFollowingFrame.rolls[0]
								newRequiredRecounts--;
							} else if (followingFrame.rolls[1]) {
								newTotalScore += followingFrame.rolls[1];
								newRequiredRecounts--;	
							}
						} else {
							newTotalScore += followingFrame.totalScore;
							newRequiredRecounts -= 2;
						}
					}
				} else {
					const nextAfterFollowingFrame = this.frames[index + 2];
					if (nextAfterFollowingFrame) {
						newTotalScore += nextAfterFollowingFrame.rolls[0];
						newRequiredRecounts--;
					}
				}
			} else {
				const followingFrame = this.frames[index + 1];
				if (followingFrame) {
					newTotalScore += followingFrame.rolls[0];
					newRequiredRecounts--;
				}
			}

			frame.totalScore = newTotalScore;
			frame.requiredRecounts = newRequiredRecounts;
		})
	}

	private recalculateTotalScore() {
		this.totalScore = this.frames.reduce((newTotalScore, frame) => {
			return newTotalScore + frame.totalScore
		}, 0)
	}
}
