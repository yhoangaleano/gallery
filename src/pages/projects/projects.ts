import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {

  public projects = [
    {
      name: 'ATH Antenas',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum nisi nihil ab necessitatibus consequatur. Perferendis impedit aliquid labore nostrum! Amet magni distinctio quam alias natus qui, eum delectus atque dolores!',
      color: this.ramdomColor(),
    },
    {
      name: 'Julio Cesar',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum nisi nihil ab necessitatibus consequatur. Perferendis impedit aliquid labore nostrum! Amet magni distinctio quam alias natus qui, eum delectus atque dolores!',
      color: this.ramdomColor(),
    },
    {
      name: 'Luis Arenas',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum nisi nihil ab necessitatibus consequatur. Perferendis impedit aliquid labore nostrum! Amet magni distinctio quam alias natus qui, eum delectus atque dolores!',
      color: this.ramdomColor(),
    },
    {
      name: 'Antonio',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum nisi nihil ab necessitatibus consequatur. Perferendis impedit aliquid labore nostrum! Amet magni distinctio quam alias natus qui, eum delectus atque dolores!',
      color: this.ramdomColor(),
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectsPage');
  }

  ramdomColor() {
    let colors = [
      '#fc5c65',
      '#eb3b5a',
      '#45aaf2',
      '#2d98da',
      '#fd9644',
      '#fa8231',
      '#4b7bec',
      '#3867d6',
      '#fed330',
      '#f7b731',
      '#a55eea',
      '#8854d0',
      '#26de81',
      '#20bf6b',
      '#2bcbba',
      '#0fb9b1',
      '#778ca3',
      '#4b6584'
    ];

    let color = colors[Math.floor(Math.random() * colors.length)];

    console.log(color);

    return color;
  }

}
