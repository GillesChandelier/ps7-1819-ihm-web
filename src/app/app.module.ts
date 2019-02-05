import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { QuestionTextComponent } from './question/question-text/question-text.component';
import { QuizzProgressComponent } from './question/quizz-progress/quizz-progress.component';
import { AnswerCardComponent } from './question/answer-card/answer-card.component';
import { HttpClientModule }    from '@angular/common/http';
import { QuizzPersonalResultComponent } from './quizz-personal-result/quizz-personal-result.component';
import { GuideComponent } from './guide/guide.component';
import { QuizzComponent } from './quizz/quizz.component';
import { VisiteurComponent } from './visiteur/visiteur.component';
import { AlbumComponent } from './album/album.component';
import { PhotoComponent } from './photo/photo.component';
import { PhotoZoomComponent } from './photo-zoom/photo-zoom.component';
import { CommonModule }     from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { ManagerComponent } from './manager/manager.component';
import {TagInputModule} from "ngx-chips";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ChartsModule } from 'ng2-charts/ng2-charts'

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionTextComponent,
    QuizzProgressComponent,
    AnswerCardComponent,
    GuideComponent,
    AnswerCardComponent,
    QuizzPersonalResultComponent,
    QuizzComponent,
    VisiteurComponent,
    AlbumComponent,
    PhotoComponent,
    PhotoZoomComponent,
    VisiteurComponent,
    ManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FileUploadModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatTabsModule,
    MatSidenavModule,
    MatBadgeModule,
    MatIconModule,
    MatChipsModule,
    MatToolbarModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
