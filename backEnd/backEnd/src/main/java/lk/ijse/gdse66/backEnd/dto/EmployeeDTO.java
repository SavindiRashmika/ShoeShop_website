package lk.ijse.gdse66.backEnd.dto;

import lk.ijse.gdse66.backEnd.embeded.Address;
import lk.ijse.gdse66.backEnd.enums.Designation;
import lk.ijse.gdse66.backEnd.enums.Gender;
import lk.ijse.gdse66.backEnd.enums.Role;
import lombok.*;

import java.sql.Date;



@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EmployeeDTO {

    private String code;
    private String name;
    private String pic;
    private Designation designation;
    private Gender gender;
    private String status;
    private Role role;
    private Date birth;
    private Date joinDate ;
    private String branch;
    private Address address;
    private String contact;
    private String email;
    private String person;
    private String EmgContact;

    private UserDTO user;
}
