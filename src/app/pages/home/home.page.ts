import { NavController } from '@ionic/angular';
import { QuestionService } from './../../services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from './../../models/question';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
declare var webkitSpeechRecognition;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentIndex = 0;
  answerOptions = ['A', 'B', 'C', 'D', 'E', 'F','G','H','I'];
  questions: any[] = [];
  pregnancy:boolean=false;
  speaking:boolean=false;
  constructor(
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router:NavController,
    private questionService: QuestionService,
    private ngZone:NgZone,
    private cd:ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getAllQuestions().subscribe((response) => {
      this.questions = response.data;
    });
  }

  selectAnswer(answerToSelect: any) {
    this.questions[this.currentIndex].answers.forEach((answer) => {
      if (answer.id == answerToSelect.id) {
        answer.isSelected = true;
      } else {
        answer.isSelected = false;
      }
    });
  }
  goNextQuestion() {
    let selectedAnswer = this.questions[this.currentIndex].answers.find((a) => a.isSelected);
    if(!selectedAnswer){
      this.toastrService.showErrorMessage("Lütfen bir şık seçiniz.");
      return;
    }
    if(this.questions[this.currentIndex].id == 8){
      if(selectedAnswer.id == 36 ||  selectedAnswer.id == 38)
      {
        this.pregnancy=true;
        this.currentIndex++;
      }
      else
      {
        this.pregnancy=false;
        this.currentIndex+=7;
      }
    }else{
      this.currentIndex++;
    }
    if (this.currentIndex >= this.questions.length) {
      this.questionService.saveQuestions(this.questions).subscribe(response=>{
        if(response.success){
          this.toastrService.showSuccessMessage(response.message);
          this.router.navigateRoot("/report");
        }else{
          this.toastrService.showErrorMessage(response.message);
        }
      },err=>{
        if(err.error && err.error.message){
          this.toastrService.showErrorMessage(err.error.message);
        }
      })
    }
  }
  getNextQuestionsButtonString() {
    let text = '';
    this.currentIndex >= this.questions.length - 1
      ? (text = 'BİTİR')
      : (text = 'BİR SONRAKİ SORU');
    return text;
  }
  goPreviousQuestion() {
    if(this.pregnancy == false && this.questions[this.currentIndex].id == 16){
      this.currentIndex -= 7;
    }else
    this.currentIndex--;
  }

  startSpeech() {
    if(this.speaking){
      this.speaking=false
      return;
    }
    var synth = window.speechSynthesis;
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    recognition.onstart = this.startSpeaking();

    recognition.onspeechend = function () {
      recognition.stop();
    };

    recognition.onresult = (event) => this.findAnswerFromSpeech(event);
    recognition.start();
    setTimeout(() => {
      recognition.stop();
    }, 5000);
  }
  startSpeaking(){
    this.speaking=true;
  }

  findAnswerFromSpeech(event:any){
    this.speaking=false;
    let speech = event.results[0][0].transcript;
    let firstLetter = speech.charAt(0).toUpperCase()
    if(this.answerOptions.includes(speech.toUpperCase()) || this.answerOptions.includes(firstLetter)){
      let answerIndex = this.answerOptions.findIndex(a=>a == speech.toUpperCase() || a==firstLetter);
      if(answerIndex != null && answerIndex != undefined){
        this.questions[this.currentIndex].answers.forEach(a=>{
          if(this.questions[this.currentIndex].answers.indexOf(a) == answerIndex){
            a.isSelected=true;
          }else{
            a.isSelected=false;
          }
        });
        this.cd.detectChanges();
      }
  }
  }
}
