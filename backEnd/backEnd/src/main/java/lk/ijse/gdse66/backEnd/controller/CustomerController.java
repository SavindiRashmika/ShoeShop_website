package lk.ijse.gdse66.backEnd.controller;


import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.CustomerDTO;
import lk.ijse.gdse66.backEnd.dto.EmployeeDTO;
import lk.ijse.gdse66.backEnd.embeded.Address;
import lk.ijse.gdse66.backEnd.service.CustomerService;
import lk.ijse.gdse66.backEnd.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RestController
@RequestMapping("api/v1/customer")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @GetMapping
    public ResponseUtil getAllCustomer(){
        return new ResponseUtil("200", "Successfully Loaded. :", service.loadAllCustomer());
    }



    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveCustomer(@ModelAttribute CustomerDTO customerDTO, Address address){
        System.out.println(customerDTO.toString());
        System.out.println(customerDTO.getAddress());
        customerDTO.setAddress(address);
        service.saveCustomer(customerDTO);
        System.out.println(customerDTO.getCode());
        return new ResponseUtil("200", "Successfully Registered.!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public ResponseUtil updateCustomer(@ModelAttribute CustomerDTO customerDTO, Address address){
        customerDTO.setAddress(address);
        service.updateCustomer(customerDTO);
        return new ResponseUtil("200", "Successfully Updated. :"+ customerDTO.getCode(),null);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping
    public ResponseUtil deleteCustomer(@RequestParam String code){
        service.deleteCustomer(code);
        return new ResponseUtil("200", "Successfully Deleted. :"+ code,null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchCus")
    public CustomerDTO searchCusId(String code){
        return service.searchCusId(code);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchCustomer")
    public CustomerDTO searchCusId(@RequestParam String code, @RequestParam String name){
        return service.searchCusId(code, name);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/cusIdGenerate")
    public @ResponseBody CustomDTO customerIdGenerate() {
        return service.customerIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/cusCount")
    public @ResponseBody CustomDTO getCustomerCount() {
        return service.getSumCustomer();
    }

}
