import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() user: User;
  
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.localStorageService.set("user", this.user);
  }
}
