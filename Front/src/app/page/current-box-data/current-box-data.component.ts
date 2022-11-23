import { CurrentBoxDataService } from './current-box-data.service';
import { Component, isDevMode, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { BoxInterface, FakeBox } from 'src/app/models/box';
import { io, Socket } from "socket.io-client";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-current-box-data',
  templateUrl: './current-box-data.component.html',
  styleUrls: ['./current-box-data.component.scss']
})
export class CurrentBoxDataComponent implements OnInit, OnDestroy {

  isLoading: boolean = true
  box?: BoxInterface = FakeBox

  sub: Subscription

  id: string

  socket: Socket

  data: any[]

  constructor(private titleService: Title, private service: CurrentBoxDataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle('Current Data Box 1 | Clepsydre')

    this.socket = io(environment.apiUrl);

    this.sub = this.activatedRoute.params.subscribe(s => {
      if (isDevMode()) {
        console.log(s)
      }
      this.getData(s['boxId'])
      this.id = s['boxId']
      this.socket.removeAllListeners()
      this.socket.on("data", (data) => {
        console.log(data)
        this.data = data
      })
    });
  }

  ngOnDestroy() {
    this.socket.removeAllListeners()
    this.socket.disconnect()
  }

  getDataPort(pin: number) {
    if (this.data) {
      return this.data.find((value) => value.pin === pin)
    }
  }

  getData(id: string) {
    this.isLoading = true
    this.service.getBoxe(id).subscribe({
      next: (value) => {
        this.box = value
        this.box.ports = this.box.ports.filter((value) => value.device && value.device.type === "sensor")
        this.isLoading = false
      },
      error: (err) => {
        this.box = undefined
        this.isLoading = false
      },
    })
  }

}
