package lk.ijse.gdse66.backEnd.service.impl;

import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.CustomerDTO;
import lk.ijse.gdse66.backEnd.entity.Customer;
import lk.ijse.gdse66.backEnd.entity.Employee;
import lk.ijse.gdse66.backEnd.repo.CustomerRepo;
import lk.ijse.gdse66.backEnd.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveCustomer(CustomerDTO dto) {
        if (customerRepo.existsById(dto.getCode())) {
            throw new RuntimeException("Customer Already Exist. Please enter another id..!");
        }
        customerRepo.save(mapper.map(dto, Customer.class));
    }

    @Override
    public void updateCustomer(CustomerDTO dto) {
        if (!customerRepo.existsById(dto.getCode())) {
            throw new RuntimeException("update failed! customerId : "+ dto.getCode());
        }
        customerRepo.save(mapper.map(dto, Customer.class));
    }

    @Override
    public void deleteCustomer(String id) {
        if (!customerRepo.existsById(id)) {
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
        customerRepo.deleteById(id);
    }

    @Override
    public ArrayList<CustomerDTO> loadAllCustomer() {
        return mapper.map(customerRepo.findAll(), new TypeToken<ArrayList<CustomerDTO>>() {
        }.getType());
    }

    @Override
    public CustomerDTO searchCusId(String id) {
        return null;
    }

    @Override
    public CustomDTO customerIdGenerate() {
        return new CustomDTO(customerRepo.getLastIndex());
    }

    @Override
    public CustomerDTO getSumCustomer() {
        return null;
    }
}
