package lk.ijse.gdse66.backEnd.service;


import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.EmployeeDTO;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface EmployeeService {

    void saveEmployee(EmployeeDTO dto);
    void updateEmployee(EmployeeDTO dto);
    void deleteEmployee(EmployeeDTO dto);
    EmployeeDTO searchEmpId(String id);
    ArrayList<EmployeeDTO> loadAllEmployee();

    @ResponseBody
    CustomDTO employeeIdGenerate();
    EmployeeDTO getSumEmployee();
}
