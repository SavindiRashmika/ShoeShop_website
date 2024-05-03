package lk.ijse.gdse66.backEnd.dto;

import lk.ijse.gdse66.backEnd.embeded.Address;
import lk.ijse.gdse66.backEnd.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SupplierDTO {

    private String code;
    private String name;
    private Category category;
    private Address address;
    private String contact1;
    private String contact2;
    private String email;

}
