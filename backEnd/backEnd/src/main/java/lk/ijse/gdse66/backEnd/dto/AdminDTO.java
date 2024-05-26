package lk.ijse.gdse66.backEnd.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdminDTO {

    private String id;
    private Double todayTotal;
    private Double totalProfit;
    private String mostSaleItem;
    private String mostSaleItemPicture;
    private Integer mostSaleItemQuantity;
}
