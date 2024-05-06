package lk.ijse.gdse66.backEnd.repo;

import lk.ijse.gdse66.backEnd.dto.EmployeeDTO;
import lk.ijse.gdse66.backEnd.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepo extends JpaRepository<Employee, String> {

    @Query(value = "SELECT code FROM employee ORDER BY code DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    EmployeeDTO findEmployeeByName(String name);
}
