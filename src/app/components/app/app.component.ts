import { Component, OnInit } from '@angular/core';
import { Frame, Roll } from 'src/app/model/Frame';
import { FrameService } from 'src/app/services/frame.service';
import { GameState } from 'src/app/model/Game';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	firstRoll: Roll = 0;
	secondRoll: Roll = 0
	areRollsValid = true;
	gameState: GameState = GameState.Started;

	constructor(private frameService: FrameService) {}

	ngOnInit() {
		this.frameService.gameStateChanger.subscribe( gameState => {
			console.log(gameState);
			this.gameState = gameState
		})
	}

	validateRoll = () => 
		this.areRollsValid = (this.firstRoll >= 0 && this.secondRoll >= 0) 
							&& (this.firstRoll <= 10 && this.secondRoll <= 10);

	isFrameLast = () => this.gameState == GameState.LastFrame
	isGameEnded = () => this.gameState == GameState.Ended

	submit() {
		this.frameService.addFrame(this.firstRoll, this.secondRoll);
	}
}
