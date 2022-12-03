import { Component, isDevMode, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { OneClotheService } from './one-clothe.service';
import { ClotheInterface } from '../../models/box';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-one-clothe',
  templateUrl: './one-clothe.component.html',
  styleUrls: ['./one-clothe.component.scss']
})
export class OneClotheComponent implements OnInit {
  isLoading: boolean = true
  clothe?: ClotheInterface = undefined

  sub: Subscription

  id: string

  constructor(private titleService: Title, private service: OneClotheService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle('Clothe | PWA Epitech')

    this.sub = this.activatedRoute.params.subscribe(s => {
      if (isDevMode()) {
        console.log(s)
      }
      this.getData(s['clotheID'])
      this.id = s['clotheID']
    });
  }

  getData(id: string) {
    this.isLoading = true
    this.service.getOneClothe(id).subscribe({
      next: (value) => {
        this.clothe = value
        this.titleService.setTitle('Clothe ' + this.clothe.name + ' | PWA Epitech')
        this.isLoading = false
      },
      error: (err) => {
        this.clothe = undefined
        this.isLoading = false
      },
    })
  }

}
