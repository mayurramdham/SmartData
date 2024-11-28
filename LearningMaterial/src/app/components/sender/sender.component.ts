import { Component, Pipe } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { CustomPipePipe } from '../../custom-pipe.pipe';

@Component({
  selector: 'app-sender',
  standalone: true,
  imports: [RouterLink,UpperCasePipe,CurrencyPipe,CustomPipePipe],
  templateUrl: './sender.component.html',
  styleUrl: './sender.component.scss'
})
export class SenderComponent {
  constructor(private dataService: DataService, private Activated:ActivatedRoute ) {}
varr :any="rinkesh"
  sendData(data :any) {
    this.dataService.forwardData(data);
    this.dataService.forwardData(data);
  }
}
