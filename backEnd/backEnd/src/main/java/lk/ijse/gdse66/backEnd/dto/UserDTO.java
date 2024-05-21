package lk.ijse.gdse66.backEnd.dto;


import lk.ijse.gdse66.backEnd.enums.Role;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private String id;
    private String email;
    private String password;
    private Role role;
}
