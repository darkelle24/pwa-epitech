import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BoxInterface, FakeBox } from 'src/app/models/box';
import { ListBoitierService } from './list-boitier.service';

@Component({
  selector: 'app-list-boitier',
  templateUrl: './list-boitier.component.html',
  styleUrls: ['./list-boitier.component.scss']
})
export class ListBoitierComponent implements OnInit {

  isLoading: boolean = true
  isLoadingButton: boolean = false

  listBox: BoxInterface[] = [
    FakeBox,
  ]

  constructor(private titleService: Title, private service: ListBoitierService) { }

  ngOnInit(): void {
    this.getData()
    this.titleService.setTitle('List Box | Clepsydre')
  }

  getData() {
    this.isLoading = true
    this.service.getBoxes().subscribe({
      next: (value) => {
        this.listBox = value
        this.isLoading = false
      },
      error: (err) => {
        this.listBox = []
        this.isLoading = false
      },
    })
  }

  addBox() {
    this.isLoadingButton = true
    this.service.addBox().subscribe({
      next: (value) => {
        this.listBox.push(value)
        this.isLoadingButton = false
      },
      error: (err) => {
        this.isLoadingButton = false
      },
    })
  }

}
