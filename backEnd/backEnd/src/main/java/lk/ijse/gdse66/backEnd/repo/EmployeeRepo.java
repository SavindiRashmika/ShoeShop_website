package lk.ijse.gdse66.backEnd.repo;

import lk.ijse.gdse66.backEnd.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepo extends JpaRepository<Employee, String> {
    /*Employee findFirstByOrderByEmployeeIdDesc();*/
    List<Employee> findByCodeOrNameContaining(String code, String name);

    @Query(value = "SELECT code FROM employee ORDER BY code DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}
