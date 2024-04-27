package lk.ijse.gdse66.backEnd.embeded;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Address {
    String address1;
    String address2;
    String address3;
}
