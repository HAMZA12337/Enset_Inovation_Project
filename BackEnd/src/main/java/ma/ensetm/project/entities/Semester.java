package ma.ensetm.project.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "semesters")
public class Semester {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String titre;
    @OneToOne
    private Speciality speciality;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Semester module = (Semester) o;
        return getCode().equals(module.getCode()) && getTitre().equals(module.getTitre());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCode(), getTitre());
    }
}
