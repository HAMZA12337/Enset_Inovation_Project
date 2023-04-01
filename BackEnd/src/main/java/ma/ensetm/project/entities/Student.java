package ma.ensetm.project.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import ma.ensetm.project.security.entities.AppUser;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "students")
public class Student {
    @Id
    private Long id;
    private String numero;
    private String nom;
    private String prenom;
    private String dateNaissance;
    private String gender;
    private String photo;
    @OneToOne
    private Speciality speciality;

    @OneToOne
    private Semester semester;

    @OneToMany
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Absence> absences = new ArrayList<>();

    @OneToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private AppUser user;
}
