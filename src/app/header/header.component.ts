import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../app.component.css']
})
export class HeaderComponent implements OnInit {
  inputedLocation: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onInputLocation(location: string) {
    this.router.navigate(['/restauracje/' + location]);
  }

}
