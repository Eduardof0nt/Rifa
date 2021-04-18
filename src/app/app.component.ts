import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('enabledStateChange', [
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      state(
        'in',
        style({
          opacity: 1,
        })
      ),
      state(
        'out',
        style({
          opacity: 0,
        })
      ),
      state(
        'ready',
        style({
          opacity: 1,
          color: 'green',
        })
      ),
      transition(
        'in => out, out => in, hide => *',
        animate('0.2s ease-in-out')
      ),
      transition('* => ready', animate('1s ease-in-out')),
    ]),
  ],
})
export class AppComponent {
  title = 'rifa';
  names = <any>[];
  state = 'hide';
  nameToShow = '';
  phone = '';
  showPhone = false;
  count = 0;

  async uploadNames() {
    var inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = '.csv';
    inputFile.style.zIndex = '-1';
    let aux_this = this;
    inputFile.onchange = (event: any) => {
      aux_this.readFile(inputFile.files);
    };
    inputFile.click();
  }

  async readFile(files: any) {
    let aux_this = this;
    var reader = new FileReader();
    reader.onload = function () {
      aux_this.names = [];
      aux_this.state = 'hide';
      aux_this.nameToShow = '';
      aux_this.phone = '';
      let results1 = (<String>reader.result).split('\n');
      results1.splice(0, 1);
      for (let result of <any>results1) {
        let r = result.split(';');
        aux_this.names.push({ name: r[0], phone: r[1] });
      }
      console.log(aux_this.names);
    };
    reader.readAsText(files[0]);
  }

  async begin() {
    this.count = 11;
    let i = 10;
    let randomElement;
    while (i > 0) {
      this.state = 'out';
      await this.sleep(500);
      randomElement = this.names[Math.floor(Math.random() * this.names.length)];
      this.nameToShow = randomElement.name;
      this.state = 'in';
      this.count -= 1;
      i -= 1;
      await this.sleep(500);
    }
    this.state = 'out';
    await this.sleep(500);
    this.count -= 1;
    randomElement = this.names[Math.floor(Math.random() * this.names.length)];
    this.nameToShow = randomElement.name;
    this.phone = randomElement.phone;
    this.state = 'ready';
  }

  sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}
