import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';
import { Location } from '@angular/common';
import { type } from 'os';
import { Type } from '../../models/type';
import { TypeService } from '../../services/type.service';
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
  public types: Type[] = [];
  public pokemonTypesMap: Map<string, string[]> = new Map();

  private _typeService: TypeService;
  constructor(pokemonService: PokemonService, location:Location,typeService: TypeService){
    this._pokemonService = pokemonService;
    this._typeService = typeService;
  }
  public ngOnInit(): void {
    this._pokemonService.getList().subscribe((data: any) => {
      let { count, next, previous, results } = data;
      this.pokemons = results; // Usamos los resultados tal como están
      this.nextPage = next;
      this.prevPage = previous;
  
      // Creamos un mapa para asociar los nombres de los Pokémon con sus tipos
      const pokemonTypesMap = new Map<string, string[]>(); // Clave: nombre del Pokémon, valor: array de imágenes de tipos
  
      // Hacer las peticiones para obtener los tipos de los 20 Pokémon de la página actual
      this.pokemons.forEach(pokemon => {
        const pokemonId = this.extractPokemonId(pokemon.url); // Extraemos el ID desde la URL del Pokémon
  
        this._pokemonService.getDetail(pokemonId).subscribe((details: any) => {
          // Extraemos los tipos de Pokémon y generamos las imágenes
          const typeImages = details.types.map((t: any) => this.getTypeImageById(this.extractPokemonId(t.type.url)));
          
          // Asociamos el nombre del Pokémon con las imágenes de sus tipos
          pokemonTypesMap.set(pokemon.name, typeImages);
        });
      });
  
      // Después de cargar todos los tipos, los almacenamos en una propiedad para acceder desde la vista
      this.pokemonTypesMap = pokemonTypesMap;
    });
  }

  public next(): void{
    this._pokemonService.getList(this.nextPage).subscribe(
      (data:any)=>{
        let {count, next,previous, results} = data;
        this.pokemons = results;
        this.nextPage = next;
        this.prevPage = previous;
        const pokemonTypesMap = new Map<string, string[]>(); // Clave: nombre del Pokémon, valor: array de imágenes de tipos
  
        // Hacer las peticiones para obtener los tipos de los 20 Pokémon de la página actual
        this.pokemons.forEach(pokemon => {
          const pokemonId = this.extractPokemonId(pokemon.url); // Extraemos el ID desde la URL del Pokémon
    
          this._pokemonService.getDetail(pokemonId).subscribe((details: any) => {
            // Extraemos los tipos de Pokémon y generamos las imágenes
            const typeImages = details.types.map((t: any) => this.getTypeImageById(this.extractPokemonId(t.type.url)));
            
            // Asociamos el nombre del Pokémon con las imágenes de sus tipos
            pokemonTypesMap.set(pokemon.name, typeImages);
          });
        });
    
        // Después de cargar todos los tipos, los almacenamos en una propiedad para acceder desde la vista
        this.pokemonTypesMap = pokemonTypesMap;
      }
    );
  }

  public prev():void{
    this._pokemonService.getList(this.prevPage).subscribe(
      (data:any)=>{
        let {count, next,previous, results} = data;
        this.pokemons = results;
        this.nextPage = next;
        this.prevPage = previous;
        const pokemonTypesMap = new Map<string, string[]>(); // Clave: nombre del Pokémon, valor: array de imágenes de tipos
  
        // Hacer las peticiones para obtener los tipos de los 20 Pokémon de la página actual
        this.pokemons.forEach(pokemon => {
          const pokemonId = this.extractPokemonId(pokemon.url); // Extraemos el ID desde la URL del Pokémon
    
          this._pokemonService.getDetail(pokemonId).subscribe((details: any) => {
            // Extraemos los tipos de Pokémon y generamos las imágenes
            const typeImages = details.types.map((t: any) => this.getTypeImageById(this.extractPokemonId(t.type.url)));
            
            // Asociamos el nombre del Pokémon con las imágenes de sus tipos
            pokemonTypesMap.set(pokemon.name, typeImages);
          });
        });
    
        // Después de cargar todos los tipos, los almacenamos en una propiedad para acceder desde la vista
        this.pokemonTypesMap = pokemonTypesMap;
      }
    );
  }

  public getData(nextPage: string): void{
    
  }
  private extractPokemonId(url: string): number {
    const urlSplitted = url.split('/');
    return Number(urlSplitted[urlSplitted.length - 2]); // El ID está antes del último "/"
  }
  public getTypeImageById(id:number):string{
    const urlImageType = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vi/x-y/";
    return urlImageType + id + ".png";
  }
  public getPokemonTypeImages(pokemon: Pokemon): string[] {
    const id = this.extractPokemonId(pokemon.url);
    let typeImages: string[] = [];
  
    this._pokemonService.getDetail(id).subscribe((details: any) => {
      typeImages = details.types.map((t: any) => this.getTypeImageById(this.extractPokemonId(t.type.url)));
    });
  
    return typeImages;
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
