import { BoxSettingsService } from './box-settings.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BoxInterface, FakeBox } from 'src/app/models/box';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-box-settings',
  templateUrl: './box-settings.component.html',
  styleUrls: ['./box-settings.component.scss']
})
export class BoxSettingsComponent implements OnInit, OnDestroy {

  isLoading: boolean = true
  box?: BoxInterface = FakeBox

  isLoadingSave: boolean = false

  boxSettingsForm = new FormGroup({
    name: new FormControl<string>(undefined, [Validators.required]),
    description: new FormControl<string>(undefined)
  })

  sub: Subscription

  id: string

  constructor(private titleService: Title, private service: BoxSettingsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle('Settings Box 1 | Clepsydre')

    this.sub = this.activatedRoute.params.subscribe(s => {
      if (isDevMode()) {
        console.log(s)
      }
      this.getData(s['boxId'])
      this.id = s['boxId']
    });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe()
  }

  onSubmit(result: any) {
    this.isLoadingSave = true
    if (isDevMode()) {
      console.log(this.id)
    }
    this.service.saveBoxConfig(this.id, this.boxSettingsForm.controls.name.value, this.boxSettingsForm.controls.description.value).subscribe({
      next: (value) => {
        this.box.name = value.name
        this.box.description = value.description
        this.isLoadingSave = false;
      },
      error: (err) => {
        this.isLoadingSave = false;
      },
    })
  }

  getData(id: string) {
    this.isLoading = true
    this.service.getBoxe(id).subscribe({
      next: (value) => {
        this.box = value
        this.boxSettingsForm.controls.name.setValue(this.box.name)
        this.boxSettingsForm.controls.description.setValue(this.box.description)
        this.isLoading = false
      },
      error: (err) => {
        this.box = undefined
        this.isLoading = false
      },
    })
  }

}
