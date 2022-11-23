import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'second-header',
  templateUrl: './second-header.component.html',
  styleUrls: ['./second-header.component.scss']
})
export class SecondHeaderComponent implements OnInit {

  links: { name: string, link: string }[] = [
    { name: 'Settings', link: 'settings' },
    { name: 'Schema', link: 'schema' },
    { name: 'Metrics', link: 'metrics' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  getLink(link: string) {
    const path = (this.route.snapshot as any)._urlSegment

    return [path.segments[0].path, path.segments[1].path, link]
  }

}
