import "bootstrap/dist/css/bootstrap.css";
import {WineCellarApp} from "./common/containers/application/application.container";
import {bootstrap} from "angular2/platform/browser";
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from "angular2/router";
import {provide} from "angular2/core";
bootstrap(WineCellarApp, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: "/"}),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);