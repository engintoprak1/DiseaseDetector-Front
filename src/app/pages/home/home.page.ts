import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'src/app/services/toastr/toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  currentIndex=0;
  answerOptions = ["A","B","C","D","E","F"]
  questions:any[]=[
    {
      questionString:"Yaşınız nedir?",
      answers:[
        {id:1,answer:"0-5 Yaş (Bebek)",isSelected:false},
        {id:2,answer:"5-15 Yaş (Genç)",isSelected:false},
        {id:3,answer:"15-25 Yaş (Yetişkin)",isSelected:false},
        {id:4,answer:"15-25 Yaş (Yetişkin)",isSelected:false},
        {id:5,answer:"15-25 Yaş (Yetişkin)",isSelected:false},
        {id:6,answer:"15-25 Yaş (Yetişkin)",isSelected:false},
      ]
    },
    {
      questionString:"Boyunuz nedir?",
      answers:[
        {id:1,answer:"150-170 cm",isSelected:false},
        {id:2,answer:"170-190 cm",isSelected:false},
        {id:3,answer:"190-210 cm",isSelected:false},
      ]
    },
    {
      questionString:"Kilonuz nedir?",
      answers:[
        {id:1,answer:"40-60 kg",isSelected:false},
        {id:2,answer:"60-80 kg",isSelected:false},
        {id:3,answer:"80+ kg",isSelected:false},
      ]
    }
  ]
  constructor(private toastrService:ToastrService) { }

  ngOnInit() {
  }

  selectAnswer(answerToSelect:any){
    this.questions[this.currentIndex].answers.forEach(answer=>{
      if(answer.id==answerToSelect.id){
        answer.isSelected=true;
      }else{
        answer.isSelected=false;
      }
    });
  }
  goNextQuestion(){
    let selectedAnswer = this.questions[this.currentIndex].answers.find(a=>a.isSelected);
    if(!selectedAnswer){
      this.toastrService.showErrorMessage("Lütfen bir şık seçiniz.");
      return;
    }
    this.currentIndex++;
    console.log(this.questions);
  }
  getNextQuestionsButtonString(){
    let text = "";
    this.currentIndex >= this.questions.length - 1 ? text= "BİTİR" : text= "BİR SONRAKİ SORU";
    return text;
  }
  goPreviousQuestion(){
    this.currentIndex--;
  }
}
