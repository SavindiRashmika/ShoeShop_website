package lk.ijse.gdse66.backEnd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@IdClass(SaleDetails_PK.class)
public class SaleDetails {

    @Id
    private String oId;
    @Id
    private String code;


    private int qty;
    private double unitPrice;

    @ManyToOne
    @JoinColumn(name = "oId",insertable = false,updatable = false)
    private Sales sale_id;

    @ManyToOne
    @JoinColumn(name = "code",referencedColumnName = "code",insertable = false,updatable = false)
    private Item items;
}
