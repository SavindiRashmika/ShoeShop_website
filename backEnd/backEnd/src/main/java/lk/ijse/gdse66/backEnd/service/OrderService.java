package lk.ijse.gdse66.backEnd.service;

import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.SaleDTO;
import lk.ijse.gdse66.backEnd.dto.SaleDetailsDTO;
import lk.ijse.gdse66.backEnd.entity.SaleDetails;
import lk.ijse.gdse66.backEnd.entity.Sales;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;


public interface OrderService {

    void placeOrder(@RequestBody SaleDTO dto);
    ArrayList<SaleDTO> LoadOrders();
    ArrayList<SaleDetailsDTO> LoadOrderDetails();
    //Double getTodayIncome();
    int getTodayOrders();
    int getDayOrderQty();

    List<SaleDTO> findAllSalesForToday();

    @ResponseBody
    CustomDTO OrderIdGenerate();
    void returnOrder(@RequestBody SaleDTO dto);
    SaleDTO searchOrder(String code);
    @ResponseBody
    CustomDTO getSumOrders();

    SaleDetails getOrderById(String id);

    List<Object[]> getTopSellItemsForToday() ;

}
