import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClotheInterface, UserInterface } from 'src/app/models/box';
import { ListBoitierService } from './list-boitier.service';
import { AuthentificationService } from '../../core/authentification/authentification.service';
import { catchError, forkJoin, of } from 'rxjs';
import { ClotheDialogService } from 'src/app/dialogs/clothe-dialog/clothe-dialog.service';

@Component({
  selector: 'app-list-boitier',
  templateUrl: './list-boitier.component.html',
  styleUrls: ['./list-boitier.component.scss']
})
export class ListBoitierComponent implements OnInit {

  isLoading: boolean = true
  isLoadingButton: boolean = false

  listClothe: ClotheInterface[] = []

  like: ClotheInterface[] = []

  constructor(private titleService: Title, private clotheDialogService: ClotheDialogService, private service: ListBoitierService) { }

  ngOnInit(): void {
    this.getData()
    this.titleService.setTitle('List Clothe | PWA Epitech')
  }

  getData() {
    this.isLoading = true
    forkJoin({ clothe: this.service.getClothes(), like: this.service.getlike() }).pipe(catchError(error => of(error)))
    .subscribe({
      next: (value) => {
        value.like.forEach(element => {
          let result = value.clothe.find(clothe => clothe.id === element.id)
          if (result) {
            result.fav = true
          }
        });
        this.listClothe = value.clothe
        this.like = value.like
        this.isLoading = false
      },
      error: (err) => {
        this.listClothe = []
        this.like = []
        this.isLoading = false
      },
    })
  }

  addClothes() {
    this.isLoadingButton = true
    this.clotheDialogService.open({})
    this.clotheDialogService.confirmed().subscribe({
        next: (value) => {
          this.isLoadingButton = false
        if (value) {
            value.fav = false
            this.listClothe.push(value)
          }
        }
    })
  }

}
