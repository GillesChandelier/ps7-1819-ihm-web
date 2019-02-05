import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuestionComponent} from './question/question.component';
import {GuideComponent} from './guide/guide.component';
import {QuizzComponent} from './quizz/quizz.component';
import {VisiteurComponent} from './visiteur/visiteur.component';
import {ManagerComponent} from "./manager/manager.component";
import { AlbumComponent } from './album/album.component';

const routes: Routes = [
  {path: 'quiz', component: QuizzComponent},
  {path: 'visiteur', component: VisiteurComponent},
  {path: 'guide', component: GuideComponent},
  {path: 'manager', component: ManagerComponent},
  { path: 'photos', component: AlbumComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
