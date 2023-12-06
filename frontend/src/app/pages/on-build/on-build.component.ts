import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-on-build',
  templateUrl: './on-build.component.html',
  styleUrls: ['./on-build.component.scss']
})
export class OnBuildComponent {
  public href: string = "";
  constructor(private router: Router) {}
  ngOnInit() {
    this.href = this.router.url.includes("admin")? '/admin':'/app';
  }
}
