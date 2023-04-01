
export interface Body {
  students: Student[];
}

export interface Student {
  id: Number;
  numero: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  resultatSemestre: string;
  codeSemestre: string;
  titreSemestre: string;
  noteSemestre: number;
  modules: Module[];
}

export interface Module {
  id: Number;
  code: string;
  titre: string;
  note: number;
  resultat: string;
  elements: Element[];
}

export interface Element {
  id: Number;
  code: string;
  titre: string;
  note: number;
  bareme: number;
  ponderation: number;
}

export interface Speciality {
  id: Number;
  code: string;
  titre: string;
}

export interface User{
  id:string,
  username: string,
  email:string,
  roles:[
    {
      roleName: string
    }
  ]
}

export interface Absence{
  id: Number;
  date: Date;
  student: Etudiant; //
  element: Element;
  justified: boolean;
}

export interface Justification{
  document: string;
}


export interface Prof{
  id: String;
  nom: string;
  prenom: string;

}

export interface Etudiant {
  id: number;
  numero:string;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  speciality: Speciality;

  isAbscent: boolean;
  justifie:boolean;
} 