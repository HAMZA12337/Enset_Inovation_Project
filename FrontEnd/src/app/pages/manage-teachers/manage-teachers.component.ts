import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DeliberationsService} from '../../services/deliberations.service';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Body, Module, Speciality} from '../../models/main.model';
import Swal from 'sweetalert2';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-manage-teachers',
  templateUrl: './manage-teachers.component.html',
  styleUrls: ['./manage-teachers.component.css']
})
export class ManageTeachersComponent implements OnInit {
  status = 'empty';
  body: Body;
  areElementsShown: boolean;
  private token: string;
  private xlsFile: any;
  specialities: Speciality[] = [];
  number = '';
  first = '';
  last = '';
  birth = '';
  specialityToListStudents: any;
  specialityToImportStudents: any;
  specialityToAddStudent: any;

  constructor(private http: HttpClient, private itemService: DeliberationsService, private router: Router, private securityService: SecurityService) {

  }

  ngOnInit() {
    this.areElementsShown = true;
    this.body = {students: []};
    this.itemService.getSpecialities().pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.specialities = res;
    });
  }


  handle(event) {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Veuillez patienter pendant le chargement du fichier !',
      showConfirmButton: false
    });
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.xlsFile = reader.result;
      const data = {
        data: this.xlsFile
      };
      this.itemService.postToImportStudents(this.specialityToImportStudents, data).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        if (res.status === 1) {
          this.body = res.data;
          localStorage.setItem('STUDENTS', JSON.stringify(this.body));
          Swal.close();
        } else if (res.status === 0) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: res.message,
            showConfirmButton: false,
            timer: 3500
          });
        }
      });
    };
  }

  openFile() {
    document.getElementById('xlsFileToBeUploaded').click();
  }

  goToManageSpecialties() {
    this.router.navigate(['manage-specialties']);
  }

  goToDeliberationsOfS1S1() {
    this.router.navigate(['deliberations-s1s1']);
  }

  goToDeliberationsOfS2S1() {
    this.router.navigate(['deliberations-s2s1']);
  }

  logout() {
    this.securityService.logout();
    this.router.navigate(['/']);
  }

  goToDeliberationsOfYear() {
    this.router.navigate(['deliberations-year']);
  }

  goToManageModules() {
    this.router.navigate(['manage-modules']);
  }

  goToManageStudents() {
    this.router.navigate(['manage-students']);
  }

  goToS1() {
    this.router.navigate(['deliberations-s1s1']);
  }

  goToS2() {
    this.router.navigate(['deliberations-s1s2']);
  }

  addItem() {

  }

  deleteItem(id: any) {
  }

  UpdateItem(numero: number) {
  }

  getStudents() {
    if (localStorage.getItem('STUDENTS') !== null) {
      this.body = JSON.parse(localStorage.getItem('STUDENTS'));
    } else {
      this.itemService.getStudents(this.specialityToListStudents).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        this.body = {students: res};
      });
    }
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }
}
