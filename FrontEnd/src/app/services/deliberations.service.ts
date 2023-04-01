import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Body} from '../models/main.model';

@Injectable({
  providedIn: 'root'
})
export class DeliberationsService {
  private token: string;
  headers: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.headers = {'Authorization': this.token};
  }

  public exportS1s1(item: Body): any {
    return this.http.post<any>(environment.apiEndpoint + '/export-s1s1', item);
  }

  public postToImportS1s1(item: any): any {
    return this.http.post<any>(environment.apiEndpoint + '/import-s1s1', item);
  }

  public postToImportStudents(speciality, item): any {
    return this.http.post<any>(environment.apiEndpoint + '/deliberations/import-students/' + speciality, item);
  }

  public postToImportTest(item: any): any {
    return this.http.post<any>(environment.apiEndpoint + '/test-import', item);
  }

  public exportS1s2(item: Body): any {
    return this.http.post<any>(environment.apiEndpoint + '/export-s1s2', item);
  }

  public postToImportS1s2(item: any): any {
    return this.http.post<any>(environment.apiEndpoint + '/import-s1s2', item);
  }

  public exportS2s1(item: Body): any {
    return this.http.post<any>(environment.apiEndpoint + '/export-s2s1', item);
  }

  public postToImportS2s1(item: any): any {
    return this.http.post<any>(environment.apiEndpoint + '/import-s2s1', item);
  }

  public exportS2s2(item: Body): any {
    return this.http.post<any>(environment.apiEndpoint + '/export-s2s2', item);
  }

  public postToImportS2s2(item: any): any {
    return this.http.post<any>(environment.apiEndpoint + '/import-s2s2', item);
  }

  public addSpeciality(item: any): any {
    return this.http.post<any>(environment.apiEndpoint + '/specialities', item);
  }

  public deleteSpeciality(id: any): any {
    return this.http.delete<any>(environment.apiEndpoint + '/specialities/' + id);
  }

  getSpecialities(): any {
    return this.http.get<any>(environment.apiEndpoint + '/specialities');
  }

  getModules(speciality, semester) {
    return this.http.get<any>(environment.apiEndpoint + '/deliberations/modules/' + speciality + '/' + semester);
  }

  deleteModule(id) {
    return this.http.delete<any>(environment.apiEndpoint + '/deliberations/modules/' + id);
  }

  // get students
  getStudents(speciality: any) {
    return this.http.get<any>(environment.apiEndpoint + '/students/findBySpeciality/' + speciality);
  }


// delete student by code 
deleteStudent(code: any) {
  return this.http.delete<any>(environment.apiEndpoint + '/students/deleteByCode/' + code );
}



  getTeachers(speciality: any) {
    return this.http.get<any>(environment.apiEndpoint + '/students/' + speciality);
  }

  addModule(item: any) {
    return this.http.post<any>(environment.apiEndpoint + '/modules', item);
  }

  addElement(item: any) {
    return this.http.post<any>(environment.apiEndpoint + '/elements', item);
  }

  deleteElement(id: Number) {
    return this.http.delete<any>(environment.apiEndpoint + '/elements/' + id);
  }

  getElements(module) {
    return this.http.get<any>(environment.apiEndpoint + '/elements/ofModule/' + module);
  }
}
