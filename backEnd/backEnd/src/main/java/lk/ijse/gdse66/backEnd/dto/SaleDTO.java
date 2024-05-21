package lk.ijse.gdse66.backEnd.dto;

import lk.ijse.gdse66.backEnd.entity.Customer;
import lk.ijse.gdse66.backEnd.entity.SaleDetails;
import lk.ijse.gdse66.backEnd.enums.Payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SaleDTO {

    private String oid;
    private String purchaseDate;
    private Double total;
    private Payment paymentMethod;
    private Integer totalPoints;
    private String cashier;
    private CustomerDTO customer;

    private List<SaleDetailsDTO> saleDetails = new ArrayList<>();
}
