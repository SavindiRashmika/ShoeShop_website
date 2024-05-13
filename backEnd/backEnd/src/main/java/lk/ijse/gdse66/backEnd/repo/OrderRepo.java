package lk.ijse.gdse66.backEnd.repo;

import lk.ijse.gdse66.backEnd.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepo extends JpaRepository<Sales, String> {

    @Query(value = "SELECT o_id FROM sales ORDER BY o_id DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}
