package lk.ijse.gdse66.backEnd.controller;


import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.EmployeeDTO;
import lk.ijse.gdse66.backEnd.embeded.Address;
import lk.ijse.gdse66.backEnd.enums.Designation;
import lk.ijse.gdse66.backEnd.enums.Gender;
import lk.ijse.gdse66.backEnd.enums.Role;
import lk.ijse.gdse66.backEnd.service.EmployeeService;
import lk.ijse.gdse66.backEnd.util.ResponseUtil;
import lk.ijse.gdse66.backEnd.util.UtilMatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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


    @PutMapping
    public ResponseUtil updateEmployee(EmployeeDTO employeeDTO,Address address){
        employeeDTO.setAddress(address);
        service.updateEmployee(employeeDTO);
        return new ResponseUtil("200", "Successfully Updated. :"+ employeeDTO.getCode(),null);

    }


    @DeleteMapping
    public ResponseUtil deleteEmployee(@RequestBody EmployeeDTO dto){
        service.deleteEmployee(dto);
        return new ResponseUtil("200", "Successfully Deleted. :"+ dto.getCode(),null);
    }

    /*@ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchEmployee")
    public EmployeeDTO searchEmpId(String code){
        return service.searchEmpId(code);
    }*/

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/EmployeeIdGenerate")
    public @ResponseBody CustomDTO employeeIdGenerate() {
        return service.employeeIdGenerate();
    }

}
