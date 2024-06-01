package lk.ijse.gdse66.backEnd.repo;

import lk.ijse.gdse66.backEnd.entity.Employee;
import lk.ijse.gdse66.backEnd.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface ItemRepo extends JpaRepository<Item,String> {

    @Query(value = "SELECT * FROM item e WHERE e.code = :code OR e.name = :name", nativeQuery = true)
    Item findItemByCodeOrName(@Param("code") String code, @Param("name") String name);

    @Query(value = "SELECT SUM(i.expected_profit) FROM item i WHERE i.createdDate = :currentDate", nativeQuery = true)
    Double findTodayExpectedProfit(@Param("currentDate") LocalDate currentDate);

    @Query(value = "SELECT COUNT(code) FROM item", nativeQuery = true)
    int getItemCount();

    @Query(value = "SELECT SUM(qty) FROM item", nativeQuery = true)
    int getItemQty();
}
