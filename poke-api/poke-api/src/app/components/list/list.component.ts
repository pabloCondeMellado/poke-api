import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';
import { Location } from '@angular/common';
import { type } from 'os';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit  {
  private _pokemonService: PokemonService;
  public pokemons: Pokemon[] = [];
  public nextPage: string= "";
  public prevPage: string= "";

  constructor(pokemonService: PokemonService, location:Location){
    this._pokemonService = pokemonService;
  }
  public ngOnInit(): void{
    this._pokemonService.getList().subscribe(
      (data:any)=>{
        let {count, next,previous, results} = data;
        this.pokemons = results;
        this.nextPage = next;
        this.prevPage = previous;
      }
    );
  }

  public next(): void{
    this._pokemonService.getList(this.nextPage).subscribe(
      (data:any)=>{
        let {count, next,previous, results} = data;
        this.pokemons = results;
        this.nextPage = next;
        this.prevPage = previous;
      }
    );
  }

  public prev():void{
    this._pokemonService.getList(this.nextPage).subscribe(
      (data:any)=>{
        let {count, next,previous, results} = data;
        this.pokemons = results;
        this.nextPage = next;
        this.prevPage = previous;
      }
    );
  }

  public getImageByPokemon(pokemon: Pokemon):string{
    const urlImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
    const urlSplitted = pokemon.url.split("/");
    const id = urlSplitted[urlSplitted.length -2];

    return urlImage + "/" + id + ".png";
  }

  public getUrlDetailPokemon(pokemon: Pokemon):string{
    const urlSplitted = pokemon.url.split("/");
    return "/detail/" + urlSplitted[urlSplitted.length -2];
  }

  capitalizeFirstLetter(text: string ): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

}
