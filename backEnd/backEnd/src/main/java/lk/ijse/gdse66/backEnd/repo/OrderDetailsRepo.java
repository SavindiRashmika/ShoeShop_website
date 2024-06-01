package lk.ijse.gdse66.backEnd.repo;

import lk.ijse.gdse66.backEnd.entity.SaleDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface OrderDetailsRepo extends JpaRepository<SaleDetails, String> {

    @Query(value = "SELECT SUM(d.qty) FROM sale_details d JOIN sales s ON d.oid = s.oid WHERE DATE(s.purchase_date) = CURDATE()", nativeQuery = true)
    Integer getDayOrderQty();


    @Query(value = "SELECT i.name, SUM(sd.qty) as totalQty " +
            "FROM sale_details sd " +
            "JOIN sales s ON sd.oid = s.oid " +
            "JOIN item i ON sd.item_code = i.code " +
            "WHERE DATE(s.purchase_date) = CURDATE() " +
            "GROUP BY i.name " +
            "ORDER BY totalQty DESC " +
            "LIMIT 1", nativeQuery = true)
    List<Object[]> findTopSellingItemForToday();


}
