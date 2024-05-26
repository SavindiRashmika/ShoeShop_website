package lk.ijse.gdse66.backEnd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Admin {

    @Id
    private String id;
    private Double todayTotal;
    private Double totalProfit;
    private String mostSaleItem;
    @Column(columnDefinition = "LONGTEXT")
    private String mostSaleItemPicture;
    private Integer mostSaleItemQuantity;
}
