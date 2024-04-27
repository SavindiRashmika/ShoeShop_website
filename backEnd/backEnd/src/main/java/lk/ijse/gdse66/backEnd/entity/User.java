package lk.ijse.gdse66.backEnd.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lk.ijse.gdse66.backEnd.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
@Entity
public class User {
    @Id
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
}
