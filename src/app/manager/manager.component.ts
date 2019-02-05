import {Component, NgZone, OnInit} from '@angular/core';
import {DataService} from '../shared/services/data/data.service';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  displayedColumns: string[] = ["theme", "10-15", "15-25", "25-35", "35-45", "45-55", "55-65", "65-75", "75+"];
  displayedColumns2: string[] = ["theme", "femmes", "hommes"];
  displayedColumns3: string[] = ["theme", "etudiants", "retraites", "touristes"];
  ageData = [];
  genreData = [];
  profilData = [];
  showFiller = false;
  total : number=0;
  isGuide: boolean = false;


  //le taux de photos par theme
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartTauxPhotoData: any[] = [{data:[0,0,0,0], label:'Taux de photos partagees'}];

  //le nombre de photos par theme
  public doughNombrePhotoData: number[] =[50,50,20,50];
  public doughNombrePhotoLabel: string[]=['Sport collectif', "Sport d'homme à homme", "Défi sur soi", 'Défi au-delà des limites'];
  public doughnutChartType: string = 'doughnut';

  //le taux de participation par age
  public barChartData: any[] = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Taux de participation par age'},
  ];
  public barChartLabels: string[] = ["10-15", "15-25", "25-35", "35-45", "45-55", "55-65", "65-75", "75+"];


  //le taux de participation par profil
  public barChartProfileData: any[] = [
    {data: [0, 0, 0], label: 'Taux de participation par profil'},
  ];
  public barChartProfileLabels: string[] = ["Etudiants", "Retraites", "Touristes"];

  //le taux de bonnes réponses envoyés par guide
  public barChartGuideData: any[] = [
    {data: [67, 43, 66], label: 'Taux de bonne reponses'},
  ];
  public barChartGuideLabels: string[] = ["Jean-Marc", "Jean-Paul", "Jean-Michel"];


  constructor(private dataService: DataService, private ngZone: NgZone) {
  }

  ngOnInit() {
    this.dataService.getParticipationRate().subscribe(res => {
      this.ageData = res.age;
      this.genreData = res.genre;
      this.profilData = res.profil;
      console.log(this.ageData[0].theme);
      const dataClone = [0,0,0,0,0,0,0,0];
      let clone = JSON.parse(JSON.stringify(this.barChartData));
      this.ageData.forEach((item, index) => {
        {
          console.log(item.theme);
          dataClone[0] += parseInt(item.dix);
          dataClone[1] += parseInt(item.quinze);
          dataClone[2] += parseInt(item.vingtcinq);
          dataClone[3] += parseInt(item.trentecinq);
          dataClone[4] += parseInt(item.quarantecinq);
          dataClone[5] += parseInt(item.cinquantecinq);
          dataClone[6] += parseInt(item.soixantecinq);
          dataClone[7] += parseInt(item.soixantequinze);
          dataClone[0] /=2;dataClone[1] /=2;dataClone[2] /=2;dataClone[3] /=2;dataClone[4] /=2;dataClone[5] /=2;dataClone[6] /=2;dataClone[7] /=2;
        }
      });
      console.log(this.profilData);
      clone[0].data = dataClone;
      this.barChartData = clone;

      let dataProfile = [0,0,0];
      let cloneProfile = JSON.parse(JSON.stringify(this.barChartProfileData));
      this.profilData.forEach((item, index) => {
        console.log(item.etudiants);
        dataProfile[0] += parseInt(item.etudiants);
        dataProfile[1] += parseInt(item.retraites);
        dataProfile[2] += parseInt(item.touristes);
        dataProfile[0] /=2; dataProfile[1] /=2;dataProfile[2] /=2;
      });

      cloneProfile[0].data = dataProfile;
      this.barChartProfileData = cloneProfile;
      console.log("Profil");
      console.log(this.barChartProfileData);
    });

    this.dataService.getPicturesStats().subscribe(res=> {
      if (res["Sport collectif"]){
        this.doughNombrePhotoData[0]+=res["Sport collectif"];
      };
      if (res["Sport d'homme à homme"]){
        this.doughNombrePhotoData[1]+=res["Sport d'homme à homme"];
      }
      if (res["Défi sur soi"]){
        this.doughNombrePhotoData[2]+=res["Défi sur soi"];
      }
      if (res["Défi au-délà des limites"]){
        this.doughNombrePhotoData[3]+=res["Défi au-delà des limites"];
      }
      this.total=this.doughNombrePhotoData[0]+this.doughNombrePhotoData[1]+this.doughNombrePhotoData[2]+this.doughNombrePhotoData[3];
      console.log(this.total);
      const dataPhoto = [];
      dataPhoto.push((this.doughNombrePhotoData[0] / this.total*100).toFixed(2));
      dataPhoto.push((this.doughNombrePhotoData[1] / this.total*100).toFixed(2));
      dataPhoto.push((this.doughNombrePhotoData[2] / this.total*100).toFixed(2));
      dataPhoto.push((this.doughNombrePhotoData[3] / this.total*100).toFixed(2));
      let clone = JSON.parse(JSON.stringify(this.barChartTauxPhotoData));
      clone[0].data = dataPhoto;
      this.barChartTauxPhotoData = clone;
      console.log(this.barChartTauxPhotoData);
    });

    this.dataService.getParticipationProfil().subscribe(res=>{
      this.barChartProfileData[0].data[1]=res["retraites"];
    });

    this.dataService.getGoodAnswersRateByGuides().subscribe(res=>{
      this.barChartGuideData[0].data[0]=res["moy"];
    })
  }

  openTable() {
    console.log("open tableau");
    this.showFiller = false;
    this.isGuide = false;
  }

  openGraph() {
    console.log("Open graph");
    this.showFiller = true;
    this.isGuide = false;
    console.log(this.ageData);
  }

  chartClicked(event: any) {
    console.log(event);
  }

  openGuide(){
    this.isGuide = true;
    this.showFiller = true;
  }
}

