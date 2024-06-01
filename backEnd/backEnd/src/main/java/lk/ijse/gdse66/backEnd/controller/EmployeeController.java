package lk.ijse.gdse66.backEnd.controller;


import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.EmployeeDTO;
import lk.ijse.gdse66.backEnd.embeded.Address;
import lk.ijse.gdse66.backEnd.service.EmployeeService;
import lk.ijse.gdse66.backEnd.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @GetMapping
    public ResponseUtil getAllEmployee(){
        return new ResponseUtil("200", "Successfully Loaded. :", service.loadAllEmployee());
    }



    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveEmployee(@ModelAttribute EmployeeDTO employeeDTO, Address address){
        System.out.println(employeeDTO.toString());
        System.out.println(employeeDTO.getAddress());
        employeeDTO.setAddress(address);
        /*String profile = UtilMatter.convertBase64(profilePic);
        employeeDTO.setPic(profile);*/
        service.saveEmployee(employeeDTO);
        System.out.println(employeeDTO.getCode());
        return new ResponseUtil("200", "Successfully Registered.!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public ResponseUtil updateEmployee(@ModelAttribute EmployeeDTO employeeDTO,Address address){
        employeeDTO.setAddress(address);
        service.updateEmployee(employeeDTO);
        return new ResponseUtil("200", "Successfully Updated. :"+ employeeDTO.getCode(),null);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping
    public ResponseUtil deleteEmployee(@RequestParam String code){
        service.deleteEmployee(code);
        return new ResponseUtil("200", "Successfully Deleted. :"+ code,null);
    }

   /* @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchEmployee")
    public EmployeeDTO searchEmpId(String code){
        return service.searchEmpId(code);
    }*/

    @GetMapping(path = "/searchEmployee")
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeDTO searchEmpId(@RequestParam String code, @RequestParam String name){
        return service.searchEmpId(code, name); // Adjusted method call
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/EmployeeIdGenerate")
    public @ResponseBody CustomDTO employeeIdGenerate() {
        return service.employeeIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/empCount")
    public @ResponseBody CustomDTO getCustomerCount() {
        return service.getSumEmployee();
    }

}
