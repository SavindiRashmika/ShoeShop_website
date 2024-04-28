package lk.ijse.gdse66.backEnd.dto;

import lk.ijse.gdse66.backEnd.embeded.Address;
import lk.ijse.gdse66.backEnd.enums.Gender;
import lk.ijse.gdse66.backEnd.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmployeeDTO {

    private String code;
    private String name;
    private String pic;
    private Gender gender;
    private String status;
    private Role role;
    private LocalDate birth;
    private LocalDate joinDate ;
    private String branch;
    private Address address;
    private String contact;
    private String email;
    private String person;
    private String EmgContact;

    private UserDTO user;
}
