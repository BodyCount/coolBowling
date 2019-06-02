import { Component, OnInit } from '@angular/core';
import { Frame, Roll } from 'src/app/model/Frame';
import { FrameService } from 'src/app/services/frame.service';
import { GameState } from 'src/app/model/Game';
import GameConfig from 'src/app/model/GameConfig';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	totalScore = 0;

	firstRoll: Roll = 0;
	secondRoll: Roll = 0
	thirdRoll: Roll = 0;

	areRollsValid = true;
	gameState: GameState = GameState.Started;

	constructor(private frameService: FrameService) {}

	ngOnInit() {
		this.frameService.gameStateChanger.subscribe( gameState => this.gameState = gameState);

		this.frameService.totalScoreChanger.subscribe( totalScore => this.totalScore = totalScore)
	}

	validateRoll = () => { 
		const firstRollNumber = Number(this.firstRoll);
		const secondRollNumber = Number(this.secondRoll);

		if (!this.isFrameLast()) {
			this.areRollsValid = (firstRollNumber >= 0 && secondRollNumber >= 0) 
								&& ((firstRollNumber + secondRollNumber) <= 10);
		} else {
			const thirdRollNumber = Number(this.thirdRoll);
			this.areRollsValid = (firstRollNumber >= 0 && secondRollNumber > 0 && thirdRollNumber >= 0) 
								&& ((firstRollNumber + secondRollNumber + thirdRollNumber) <= 30);
		}
	}

	isFrameLast = () => this.gameState == GameState.LastFrame
	isGameEnded = () => this.gameState == GameState.Ended
	isThirdRollAvailable = () => this.isFrameLast() && Number(this.firstRoll) === GameConfig.strikeScore

	submit() {
		this.frameService.addFrame(this.firstRoll, this.secondRoll, this.thirdRoll);
	}
}
