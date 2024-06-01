package lk.ijse.gdse66.backEnd.repo;

import lk.ijse.gdse66.backEnd.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface AdminRepo extends JpaRepository<Admin,String> {

    @Query(value = "SELECT SUM(total) FROM sales WHERE DATE(purchase_date) = CURDATE()", nativeQuery = true)
    Double getTodayIncome();

    @Modifying
    @Transactional
    @Query(value = "UPDATE sales s SET s.total = :income WHERE s.purchase_date = CURRENT_DATE", nativeQuery = true)
    void updateTodayIncome(@Param("income") Double income);

}
