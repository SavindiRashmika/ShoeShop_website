package lk.ijse.gdse66.backEnd.dto;

import lk.ijse.gdse66.backEnd.embeded.Address;
import lk.ijse.gdse66.backEnd.enums.Gender;
import lk.ijse.gdse66.backEnd.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;
import java.sql.Timestamp;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerDTO {

    private String code;
    private String name;
    private Gender gender;
    private Date loyaltyDate;
    private Level level;
    private Integer loyaltyPoints;
    private Date dob;
    private Address address;
    private String contact;
    private String email;
    private String recentPurchaseDate;

}
