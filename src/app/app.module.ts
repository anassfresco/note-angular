// Modules

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';


// config routing
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { ButtonComponent } from './Components/button/button.component';
import { NotesComponent } from './Components/notes/notes.component';
import { Route } from '@angular/compiler/src/core';
import { AboutComponent } from './Components/about/about.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NotesItemComponent } from './Components/notes-item/notes-item.component';
import { AddNoteComponent } from './Components/add-note/add-note.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { SearchNoteComponent } from './Components/search-note/search-note.component'

// config routes :
const appRoutes : Routes = [
  { path: "", component: NotesComponent }, // config the home page 
  { path: "about", component: AboutComponent} // config about page
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    NotesComponent,
    AboutComponent,
    FooterComponent,
    NotesItemComponent,
    AddNoteComponent,
    SearchNoteComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}  
    ),
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
