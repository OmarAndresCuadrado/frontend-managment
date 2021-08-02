import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public arrayRoutes: any[] = [
    {
      'displayedText': 'Panel de clientes',
      'route': '/client'
    },
    {
      'displayedText': 'Panel de productos',
      'route': '/product'
    },
    {
      'displayedText': 'Panel de seguimiento de ventas',
      'route': '/bill'
    }
  ];


  constructor() { }



  ngOnInit(): void {
  }

}
