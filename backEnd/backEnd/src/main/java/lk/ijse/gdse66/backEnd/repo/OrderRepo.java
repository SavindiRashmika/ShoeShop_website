package lk.ijse.gdse66.backEnd.repo;

import lk.ijse.gdse66.backEnd.dto.SaleDTO;
import lk.ijse.gdse66.backEnd.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

public interface OrderRepo extends JpaRepository<Sales, String> {

    @Query(value = "SELECT oid FROM sales ORDER BY oid DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Query(value = "SELECT COUNT(oid) FROM sales WHERE DATE(purchase_date) = CURDATE()", nativeQuery = true)
    int getTodayOrders();

    @Query(value = "SELECT * FROM sales s WHERE DATE(purchase_date) = CURDATE()", nativeQuery = true)
    List<Sales> findAllSalesForToday();


   /* @Query(value = "SELECT SUM(total) FROM sales WHERE DATE(purchase_date) = CURDATE()", nativeQuery = true)
    Double getTodayIncome();


    @Modifying
    @Transactional
    @Query(value = "UPDATE sales s SET s.total = :income WHERE s.purchase_date = CURRENT_DATE", nativeQuery = true)
    void updateTodayIncome(@Param("income") Double income);*/


}
