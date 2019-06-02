import { Component, OnInit } from '@angular/core';
import { FrameService } from 'src/app/services/frame.service';
import { Frame } from 'src/app/model/Frame';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html',
  styleUrls: ['./game-summary.component.scss']
})
export class GameSummaryComponent implements OnInit {

  frames: Array<Frame> = [];

  constructor(private frameService: FrameService) { }

  ngOnInit() {
    this.frameService.framesChanger.subscribe( frame => this.frames.push(frame) )
  }

}
