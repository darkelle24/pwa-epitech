import { Component, isDevMode, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { OneClotheService } from './one-clothe.service';
import { ClotheInterface } from '../../models/box';
import { catchError, forkJoin, of, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClotheDialogService } from '../../dialogs/clothe-dialog/clothe-dialog.service';
import { PhotoDialogService } from '../../dialogs/photo-dialog/photo-dialog.service';

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

  constructor(private titleService: Title, private photoDialogService: PhotoDialogService, private clotheDialogService: ClotheDialogService, private service: OneClotheService, private activatedRoute: ActivatedRoute) { }

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

    forkJoin({ clothe: this.service.getOneClothe(id), like: this.service.getlike() }).pipe(catchError(error => of(error)))
    .subscribe({
      next: (value) => {
        let result = value.like.find(clothe => clothe.id === value.clothe.id)
        if (result) {
          value.clothe.fav = true
        } else {
          value.clothe.fav = false
        }
        this.clothe = value.clothe
        this.titleService.setTitle('Clothe ' + this.clothe.name + ' | PWA Epitech')
        this.isLoading = false
      },
      error: (err) => {
        this.clothe = undefined
        this.isLoading = false
      },
    })
  }

  getImageUrl() {
    if (this.clothe.picture && this.clothe.picture.id) {
      return environment.apiUrl + '/files/show/' + this.clothe.picture.id
    } else {
      return ''
    }
  }

  handleFav() {
    if (this.clothe.fav) {
      this.service.dislike(this.clothe.id, this.clothe.name).subscribe({
        next: (value) => {
          this.clothe.fav = false
        },
        error: (err) => {
        },
      })
    } else {
      this.service.like(this.clothe.id, this.clothe.name).subscribe({
        next: (value) => {
          this.clothe.fav = true
        },
        error: (err) => {
        },
      })
    }
  }

  order() {
    this.service.order(this.clothe.id, this.clothe.name).subscribe({
      next: (value) => {
        let fav = this.clothe.fav
        this.clothe = value
        this.clothe.fav = fav
      },
      error: (err) => {
      },
    })
  }

  update() {
    this.clotheDialogService.open({ clothe: this.clothe })
    this.clotheDialogService.confirmed().subscribe({
      next: (value) => {
        if (value) {
          let fav = this.clothe.fav
          this.clothe = value
          this.clothe.fav = fav
        }
      }
    })
  }

  checkSame() {
    let user = JSON.parse(localStorage.getItem(environment.projectName + '_info'))

    console.log(user)
    if (user.id !== this.clothe.user.id) {
      return false
    } else {
      return true
    }
  }

  openPhoto() {
    this.photoDialogService.open({ clothe: this.clothe })
    this.photoDialogService.confirmed().subscribe({
      next: (value) => {
        if (value) {
          let fav = this.clothe.fav
          this.clothe = value
          this.clothe.fav = fav
        }
      }
    })
  }

}
