package lk.ijse.gdse66.backEnd.service.impl;


import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.EmployeeDTO;
import lk.ijse.gdse66.backEnd.entity.Employee;
import lk.ijse.gdse66.backEnd.repo.EmployeeRepo;
import lk.ijse.gdse66.backEnd.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public ArrayList<EmployeeDTO> loadAllEmployee() {
        return mapper.map(employeeRepo.findAll(), new TypeToken<ArrayList<EmployeeDTO>>() {
        }.getType());
    }


    @Override
    public void saveEmployee(EmployeeDTO dto) {
        if (employeeRepo.existsById(dto.getCode())) {
            throw new RuntimeException("Employee Already Exist. Please enter another id..!");
        }
        employeeRepo.save(mapper.map(dto, Employee.class));
    }

    @Override
    public void updateEmployee(EmployeeDTO dto) {
        if (!employeeRepo.existsById(dto.getCode())) {
            throw new RuntimeException("update failed! employeeId : "+ dto.getCode());
        }
        employeeRepo.save(mapper.map(dto, Employee.class));

    }

    @Override
    public void deleteEmployee(String id) {
        if (!employeeRepo.existsById(id)) {
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
        employeeRepo.deleteById(id);
    }


  /*  @Override
    public EmployeeDTO searchEmpId(String code) {
       *//* if (!employeeRepo.existsById(code)) {
            throw new RuntimeException("Wrong ID. Please enter Valid id..!");
        }
        return mapper.map(employeeRepo.findById(code).get(), EmployeeDTO.class);*//*
        return null;

    }*/

    @Override
    public EmployeeDTO searchEmpId(String code, String name) {
        Employee employee = employeeRepo.findEmployeeByCodeOrName(code, name);
        if (employee == null) {
            throw new RuntimeException("Employee not found with code: " + code + " or name: " + name);
        }
        return mapper.map(employee, EmployeeDTO.class);
    }


    @Override
    public CustomDTO employeeIdGenerate() {
        return new CustomDTO(employeeRepo.getLastIndex());
    }

    @Override
    public CustomDTO getSumEmployee() {
        return new CustomDTO(employeeRepo.getEmpCount());
    }
}
