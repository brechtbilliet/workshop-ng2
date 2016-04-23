import {Headers} from "angular2/http";
export const API_URL: string = "https://winecellarapp.herokuapp.com/api";
export const DEFAULT_HEADERS: Headers = new Headers({ "Content-Type": "application/json" });
export const LOCALSTORAGE_AUTH: string = "authentication";