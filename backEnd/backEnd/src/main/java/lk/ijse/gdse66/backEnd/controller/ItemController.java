package lk.ijse.gdse66.backEnd.controller;


import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.ItemDTO;
import lk.ijse.gdse66.backEnd.entity.Supplier;
import lk.ijse.gdse66.backEnd.service.ItemService;
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


    @GetMapping
    public ResponseUtil getAllItem(){
        return new ResponseUtil("200", "Successfully Loaded. :", itemService.loadAllItem());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveItem(@ModelAttribute ItemDTO itemDTO){
        System.out.println(itemDTO.toString());

        if(itemDTO.getSupplier() == null) {
            return new ResponseUtil("500", "Supplier information is missing!", null);
        }
        String supplierId = itemDTO.getSupplier().getCode();
        String supName = itemDTO.getSupName();
        Supplier supplier = new Supplier();
        supplier.setCode(supplierId);
        supplier.setName(supName);
        itemDTO.setSupplier(supplier);

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
    @GetMapping(path = "/searchI")
    public ItemDTO searchItemId(String code){
        return itemService.searchItemId(code);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchItem")
    public ItemDTO searchItemId(@RequestParam String code, @RequestParam String name){
        return itemService.searchItemId(code, name); // Adjusted method call
    }


    @GetMapping("/todayExpectedProfit")
    public Double getTodayExpectedProfit() {
        return itemService.getTodayExpectedProfit();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/itemCount")
    public @ResponseBody CustomDTO getItemCount() {
        return itemService.getItemCount();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/itemQty")
    public @ResponseBody CustomDTO getItemQty() {
        return itemService.getItemQty();
    }


}
