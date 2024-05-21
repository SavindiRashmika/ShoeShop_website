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
@Table(name = "sale_details")
public class SaleDetails {

    @Id
    private String oid;
    @Id
    private String itemCode;


    private int qty;
    private double unitPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "oid",referencedColumnName = "oid",insertable = false, updatable = false)
    private Sales sale;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "itemCode",referencedColumnName = "code",insertable = false, updatable = false)
    private Item items;
}
