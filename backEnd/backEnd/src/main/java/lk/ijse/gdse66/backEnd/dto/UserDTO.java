package lk.ijse.gdse66.backEnd.dto;


import lk.ijse.gdse66.backEnd.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDTO {
    private String email;
    private String password;
    private Role role;
}
