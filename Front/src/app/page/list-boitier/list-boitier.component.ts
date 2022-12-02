import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClotheInterface } from 'src/app/models/box';
import { ListBoitierService } from './list-boitier.service';

@Component({
  selector: 'app-list-boitier',
  templateUrl: './list-boitier.component.html',
  styleUrls: ['./list-boitier.component.scss']
})
export class ListBoitierComponent implements OnInit {

  isLoading: boolean = true
  isLoadingButton: boolean = false

  listClothe: ClotheInterface[] = []

  constructor(private titleService: Title, private service: ListBoitierService) { }

  ngOnInit(): void {
    this.getData()
    this.titleService.setTitle('List Clothe | PWA Epitech')
  }

  getData() {
    this.isLoading = true
    this.service.getClothes().subscribe({
      next: (value) => {
        this.listClothe = value
        this.isLoading = false
      },
      error: (err) => {
        this.listClothe = []
        this.isLoading = false
      },
    })
  }

  addClothes() {
    this.isLoadingButton = true
    this.service.addClothes().subscribe({
      next: (value) => {
        this.listClothe.push(value)
        this.isLoadingButton = false
      },
      error: (err) => {
        this.isLoadingButton = false
      },
    })
  }

}
