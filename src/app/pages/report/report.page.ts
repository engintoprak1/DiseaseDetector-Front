import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { $ } from 'protractor';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  @ViewChild('mailtoLink') fileInput:ElementRef;
  report:string="";
  constructor(private reportService:ReportService) { }

  ngOnInit() {
    this.getReports();
  }
  getReports(){
    this.reportService.getSimulationReport().subscribe(response=>{
      if(response.success){
        this.report = response.data;
      }
    })
  }
  clickOnShare(){
  this.fileInput.nativeElement.click();
  }

}
