package lk.ijse.gdse66.backEnd.repo;

import lk.ijse.gdse66.backEnd.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepo extends JpaRepository<Customer,String> {

    @Query(value = "SELECT code FROM customer ORDER BY code DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}
