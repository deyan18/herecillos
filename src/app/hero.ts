export interface Hero {
  id: number;
  name: string;
  superpowers: Array<Superpower>;
}

export interface Superpower {
  name: string;
}

export interface MarvelGet{
  code : number;
  data : Data;
}
interface Data{
  count : number;
  results : Results[];
}
interface Results{
  thumbnail: Thumbnail;
}
interface Thumbnail{
  path : string;
  extension : string;
}
