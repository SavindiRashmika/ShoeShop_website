package lk.ijse.gdse66.backEnd.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class SaleDetails_PK implements Serializable {
    private String oid;
    private String itemCode;
}
