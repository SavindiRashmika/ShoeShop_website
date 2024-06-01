package lk.ijse.gdse66.backEnd.service;


import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.EmployeeDTO;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface EmployeeService {

    void saveEmployee(EmployeeDTO dto);
    void updateEmployee(EmployeeDTO dto);
    void deleteEmployee(String id);
   /* EmployeeDTO searchEmpId(String code);*/

    EmployeeDTO searchEmpId(String code, String name);
    ArrayList<EmployeeDTO> loadAllEmployee();

    @ResponseBody
    CustomDTO employeeIdGenerate();
    CustomDTO getSumEmployee();
}
