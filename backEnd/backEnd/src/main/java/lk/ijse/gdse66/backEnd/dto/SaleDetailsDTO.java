package lk.ijse.gdse66.backEnd.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SaleDetailsDTO {

    private String oId;
    private String itemCode;
    private int qty;
    private double unitPrice;

}
