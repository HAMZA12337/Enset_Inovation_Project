package ma.ensetm.project.controllers;

import ma.ensetm.project.dtos.Student;
import ma.ensetm.project.entities.Speciality;
import ma.ensetm.project.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/students")
public class TheStudentsRestController {
    @Autowired
    SpecialityService specialityService;
    @Autowired
    StudentService studentService;
    @Autowired
    MarkService markService;
    @Autowired
    ModuleService moduleService;
    @Autowired
    SemesterService semesterService;
    @Autowired
    ElementService elementService;


    @GetMapping("byCode/{code}")
    public Student getStudentByCode(@PathVariable("code") String code) {
        ma.ensetm.project.entities.Student student = studentService.findByCode(code);
        Student returned = new Student();
        returned.setNumero(student.getNumero());
        returned.setNom(student.getNom());
        returned.setPrenom(student.getPrenom());
        returned.setDateNaissance(student.getDateNaissance());
        returned.setGender(student.getGender());
        return returned;
    }

    // get students by Speciality
    @GetMapping("findBySpeciality/{code}")
    public List<ma.ensetm.project.entities.Student> getStudentsBySpeciaity(@PathVariable("code") String code){
        Speciality speciality=specialityService.getByCode(code);
        List<ma.ensetm.project.entities.Student> listStudent=studentService.findBySpeciality(speciality);

    return listStudent;}

// delete students by Numero

    @DeleteMapping("deleteByCode/{code}")
    public int DeleteStudentByCode(@PathVariable("code") String code){

        int status=studentService.deleteByCode(code);

        return status;}








}
