package lk.ijse.gdse66.backEnd.controller;


import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.SaleDTO;
import lk.ijse.gdse66.backEnd.entity.SaleDetails;
import lk.ijse.gdse66.backEnd.entity.Sales;
import lk.ijse.gdse66.backEnd.service.OrderService;
import lk.ijse.gdse66.backEnd.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    /*@ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/todayIncome")
    public ResponseUtil getTodayIncome() {
        Double todayIncome = orderService.getTodayIncome();
        return new ResponseUtil("OK", "Successfully Loaded Income.", todayIncome);
    }*/

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "/returnOrder")
    public ResponseUtil returnOrder(@RequestBody SaleDTO dto) {
        orderService.returnOrder(dto);
        return new ResponseUtil("Ok", "Successfully Returned Order.!", null);
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


    @ResponseStatus(HttpStatus.CREATED)
    @GetMapping(path = "/searchOrder")
    public SaleDTO searchOrder(String code){
        return orderService.searchOrder(code);
    }


    @GetMapping(path = "/todayOrders")
    public ResponseUtil getTodayIncome() {
        int todayOrders = orderService.getTodayOrders();
        return new ResponseUtil("OK", "Successfully Loaded orders.", todayOrders);
    }

    @GetMapping(path = "/todayOrderQ")
    public ResponseUtil getDayOrderQty() {
        int todayOrderQ = orderService.getDayOrderQty();
        return new ResponseUtil("OK", "Successfully Loaded orders.", todayOrderQ);
    }

    @GetMapping(path = "/TodayOrderDetails")
    public ResponseUtil TodayOrderDetails() {
        return new ResponseUtil("OK", "Successfully Loaded. :",  orderService.findAllSalesForToday());
    }

    @GetMapping("/topItems")
    public List<Object[]> getTopSellingItems() {
        return orderService.getTopSellItemsForToday();
    }
}
