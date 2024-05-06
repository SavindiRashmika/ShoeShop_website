package lk.ijse.gdse66.backEnd.controller;

import lk.ijse.gdse66.backEnd.dto.ItemDTO;
import lk.ijse.gdse66.backEnd.entity.Supplier;
import lk.ijse.gdse66.backEnd.service.ItemService;
import lk.ijse.gdse66.backEnd.service.SupplierService;
import lk.ijse.gdse66.backEnd.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/item")
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    private ItemService itemService;
    @Autowired
    private SupplierService supplierService;

    @GetMapping
    public ResponseUtil getAllItem(){
        return new ResponseUtil("200", "Successfully Loaded. :", itemService.loadAllItem());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveItem(@ModelAttribute ItemDTO itemDTO){
        System.out.println(itemDTO.toString());

        // Check if the supplier object is null
        if(itemDTO.getSupplier() == null) {
            return new ResponseUtil("500", "Supplier information is missing!", null);
        }

        // Retrieve supplier information from the DTO
        String supplierId = itemDTO.getSupplier().getCode();
        String supName = itemDTO.getSupName();

        // Create a new Supplier entity
        Supplier supplier = new Supplier();
        supplier.setCode(supplierId);
        supplier.setName(supName);

        // Set the Supplier entity back to the ItemDTO
        itemDTO.setSupplier(supplier);

        // Save the item
        itemService.saveItem(itemDTO);

        return new ResponseUtil("200", "Successfully Registered.!", null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping
    public ResponseUtil updateItem(@ModelAttribute ItemDTO itemDTO){
        itemService.updateItem(itemDTO);
        return new ResponseUtil("200", "Successfully Updated. :"+ itemDTO.getCode(),null);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping
    public ResponseUtil deleteItem(@RequestParam String code){
        itemService.deleteItem(code);
        return new ResponseUtil("200", "Successfully Deleted. :"+ code,null);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchEmployee")
    public ItemDTO searchItemId(String code){
        return itemService.searchItemId(code);
    }

}
