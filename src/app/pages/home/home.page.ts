import { QuestionService } from './../../services/question.service';
import { ActivatedRoute } from '@angular/router';
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
  answerOptions = ['A', 'B', 'C', 'D', 'E', 'F'];
  questions: any[] = [];
  constructor(
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
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
    let selectedAnswer = this.questions[this.currentIndex].answers.find(
      (a) => a.isSelected
    );
    // if(!selectedAnswer){
    //   this.toastrService.showErrorMessage("Lütfen bir şık seçiniz.");
    //   return;
    // }
    this.currentIndex++;
    if (this.currentIndex >= this.questions.length) {
      console.log('BURDA BİTİR');
      console.log(this.questions);
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
    this.currentIndex--;
  }

  startSpeech() {
    var synth = window.speechSynthesis;
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    recognition.onstart = function () {
      console.log('We are listening. Try speaking into the microphone.');
    };

    recognition.onspeechend = function () {
      recognition.stop();
    };

    recognition.onresult = (event) => this.findAnswerFromSpeech(event);
    recognition.start();
  }

  findAnswerFromSpeech(event:any){
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
