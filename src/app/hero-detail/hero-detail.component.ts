import { Component, OnInit, Input } from '@angular/core';
import { Hero, Superpower } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { multicast } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;
  selectedSuperpower: number = -1;
  addSuperpower = false;
  newSuperpower = "";
  editName = false;
  heroImage : string  ="";

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  getHeroImage(): void{
    if(this.hero != undefined){

      this.heroService.searchApiImage(this.hero.name)
        .subscribe(data =>
         {
           if(data.data.count  == 0) {
             this.heroImage = "https://i1.sndcdn.com/artworks-000380631408-vyo4ax-t500x500.jpg";
           }else{
             console.log(data.data.results[0].thumbnail.path +"portrait_incredible"+ data.data.results[0].thumbnail.extension)
             this.heroImage = data.data.results[0].thumbnail.path +"/portrait_incredible."+ data.data.results[0].thumbnail.extension;

           }

          }
        )
    }
  }

  addNewSuperpower(){
    const sp: Superpower = {name: this.newSuperpower};
    this.hero?.superpowers.push(sp);
    this.save();
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.getHeroImage();
      } );
  }

  goBack(): void {
    this.location.back();
  }
  delete(hero: Hero): void {
    //this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }


}
