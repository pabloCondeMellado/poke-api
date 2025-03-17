import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { MoveService } from '../../services/move.service';
import { AbilityService } from '../../services/ability.service';
import { SpeciesService } from '../../services/species.service';
import { TypeService } from '../../services/type.service';
import { PokemonDetail } from '../../models/pokemon-details';
import { Move } from '../../models/move';
import { Type } from '../../models/type';
import { Ability } from '../../models/ability';
import { Specie } from '../../models/specie';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  private _location:Location;
  private _pokemonService: PokemonService;
  private _moveService: MoveService;
  private _abilityService: AbilityService;
  private _specieService: SpeciesService;
  private _typeService: TypeService;
  private _route: ActivatedRoute;
  public pokemon: PokemonDetail | null = null;
  public moves: Move[] = [];
  public types: Type[] = [];
  public abilities: Ability[] = [];
  public specie: Specie | null = null;
  public id: number = 0;

  constructor(location: Location, pokemonService: PokemonService, route: ActivatedRoute, moveService: MoveService, typeService: TypeService, abilityService: AbilityService, specieService: SpeciesService){
    this._location = location;
    this._pokemonService = pokemonService;
    this._route = route;
    this._moveService = moveService;
    this._typeService = typeService;
    this._abilityService = abilityService;
    this._specieService = specieService;
  }

  public ngOnInit(): void{
    let idParam = this._route.snapshot.paramMap.get("id");
    if(idParam){
      this.id = Number(idParam);
    }

    if(this.id){
      this._pokemonService.getDetail(this.id).subscribe(
        (data:any) =>{
          this.pokemon = data;
        }
      );

      if(this.pokemon?.species != null){
        this._specieService.getDetail(this.pokemon.species.url).subscribe(
          (data:any) =>{
            const specie: Specie = data;
            specie.name = this.getNameByLanguage(data.names, 'es');
            specie.desc = this.getDescByLanguage(data.flavor_text_entries, 'es');
            this.specie = specie;
          }
        );
      }

      this.pokemon?.abilities.forEach(
        (data:any)=>{
          this._abilityService.getDetail(data.ability.url).subscribe(
            (data:any)=>{
              const ability: Ability = data;
              ability.name = this.getNameByLanguage(data.names, 'es');
              ability.desc = this.getDescByLanguage(data.flavor_text_entries, 'es');
              this.abilities.push(ability);
            }
          );
        }
      );

      this.pokemon?.types.forEach(
        (data:any)=>{
          this._typeService.getDetail(data.type.url).subscribe(
            (data:any)=>{
              const type: Type = data;
              type.name = this.getNameByLanguage(data.names, 'es');
              type.image = this.getTypeImageById(type.id);
              this.types.push(type);
            }
          )
        }
      );

      this.pokemon?.moves.forEach(
        (data:any) => {
          this._moveService.getDetail(data.move.url).subscribe(
            (data:any) => {
              const move: Move = data;
              move.name = this.getNameByLanguage(data.names, 'es');
              move.desc = this.getDescByLanguage(data.flavor_text_entries, 'es');
              const urlType = data.type.url.split("/");
              move.type.image = this.getTypeImageById(urlType[urlType.length - 2]);
              this.moves.push(move);
            }
          )
        }
      );

    }
  }

  getTypeImageById(id: number): string{
    const urlImageType = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/xd/";
    return urlImageType + id + ".png";
  }

  getNameByLanguage(names: string[], language:string):string{
    let result = "";
    names.forEach((name:any)=>{
      if(name.language.name == language){
        result = name.name;
      }
    });
    return result;
  }

  getDescByLanguage(names: string[], language: string): string{
    let result = "";
    names.forEach((flavor_text:any)=>{
      if(flavor_text.language.name == language){
        result = flavor_text.flavor_text;
      }
    });
    return result;
  }

  goBack(): void {
    this._location.back();
  }


  getImageByPokemon(PokemonDetail: PokemonDetail){
    let urlImage:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
    return urlImage + PokemonDetail?.id + ".png";
  }

  capitalizeFirstLetter(text: string):string{
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

}
