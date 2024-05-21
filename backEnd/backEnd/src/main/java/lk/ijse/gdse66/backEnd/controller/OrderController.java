package lk.ijse.gdse66.backEnd.controller;


import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.SaleDTO;
import lk.ijse.gdse66.backEnd.dto.SaleDetailsDTO;
import lk.ijse.gdse66.backEnd.service.OrderService;
import lk.ijse.gdse66.backEnd.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/OrderIdGenerate")
    public @ResponseBody CustomDTO OrderIdGenerate(){
        return orderService.OrderIdGenerate();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil placeOrder(@RequestBody SaleDTO dto) {
        System.out.println(dto.toString());
        orderService.placeOrder(dto);
        return new ResponseUtil("Ok", "Successfully Purchased.!", null);
    }



    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/LoadOrders")
    public ResponseUtil LoadOrders() {
        return new ResponseUtil("OK", "Successfully Loaded. :", orderService.LoadOrders());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/LoadOrderDetails")
    public ResponseUtil LoadOrderDetails() {
        return new ResponseUtil("OK", "Successfully Loaded. :", orderService.LoadOrderDetails());
    }
}
