import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {DeliberationsService} from '../../services/deliberations.service';
import {StudentsService} from '../../services/students.service';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Body, Module, Speciality} from '../../models/main.model';
import Swal from 'sweetalert2';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {
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
  genders = [];

  constructor(private http: HttpClient, private itemService: DeliberationsService,private itemServiceStudent: StudentsService, private router: Router, private securityService: SecurityService) {

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
    this.genders.push('F','F','F','F','F',
      'M','M','M','F','F','F','M','F','F',
      'F','F','F','F','F','F','F','F','F',
      'F','F','F','F','F','F','F','F','F',
      'F','F','F','M','F','M','F','F','M');
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


////////////////////////////////////////////////// Function to delete a student ///////////////////////////////////////////////////////////

  deleteItem(id: any) {
 
     Swal.fire({
  title: 'Do you want to delete this student?',
  showDenyButton: false,
  showCancelButton: true,
  confirmButtonText: 'Delete',
  
}).then((result) => {
 
  if (result.isConfirmed) {
    this.itemServiceStudent.deleteStudent(id).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      if (res === 1) {
        Swal.fire('Deleted!', '', 'success')
      this.refreshList();
}
    })
    
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
})
  }

 /////////////////////////////////////////////// RefreshList of students ////////////////////////////////////////////////////////////////////
  refreshList() {
    this.itemService.getStudents(this.specialityToListStudents).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      this.body = {students: res};
    });
  }
///////////////////////////////////////////////// Update Student ////////////////////////////////////////////////////////////////////
 UpdateItem(id: any) {

     this.itemServiceStudent.getStudentByCode(id).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
       
      
Swal.fire({
  title: 'Modifier Etudiant',
  html: `
    <input type="text" id="numero" value=${Object.values(res)[0]} class="swal2-input" placeholder="Numéro">
    <input type="text" id="nom" value=${Object.values(res)[1]} class="swal2-input" placeholder="Nom">
    <input type="text" id="prenom" value=${Object.values(res)[2]} class="swal2-input" placeholder="Prénom">
    <input type="text" id="sexe" value=${Object.values(res)[3]} class="swal2-input" placeholder="Sexe">
    <input type="date" id="date_naissance"  value=${Object.values(res)[3]} class="swal2-input" placeholder="Date de naissance">
  
  `,
  confirmButtonText: 'Modifier',
  focusConfirm: false,
  preConfirm: () => {
    const login = Swal.getPopup().querySelector('#numero')
    const password = Swal.getPopup().querySelector('#nom')
    if (!login || !password) {
      Swal.showValidationMessage(`Please enter login and password`)
    }
    return { login: login, password: password }
  }
}).then((result) => {
  Swal.fire(`
    Login: ${result.value.login}
    Password: ${result.value.password}
  `.trim())
})
});
}

/////////////////////////////////////////////// Get List of Students ////////////////////////////////////////////////////////////////////////
  getStudents(dd: any) {
    console.log(dd);
    this.itemService.getStudents(dd).pipe(
      catchError(err => {
        return throwError(err);
      })
    ).subscribe(res => {
      console.log(res);
      this.body = { students: res };
    });
   
      this.itemService.getStudents(this.specialityToListStudents).pipe(
        catchError(err => {
          return throwError(err);
        })
      ).subscribe(res => {
        this.body = {students: res};
      });
    }
  

  goToMenu() {
    this.router.navigate(['menu']);
  }
}
