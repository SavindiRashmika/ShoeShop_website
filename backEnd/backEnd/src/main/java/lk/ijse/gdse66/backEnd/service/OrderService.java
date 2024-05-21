package lk.ijse.gdse66.backEnd.service;

import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.SaleDTO;
import lk.ijse.gdse66.backEnd.dto.SaleDetailsDTO;
import lk.ijse.gdse66.backEnd.entity.SaleDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface OrderService {

    void placeOrder(@RequestBody SaleDTO dto);
    ArrayList<SaleDTO> LoadOrders();
    ArrayList<SaleDetailsDTO> LoadOrderDetails();

    @ResponseBody
    CustomDTO OrderIdGenerate();
    @ResponseBody
    CustomDTO getSumOrders();

    SaleDetails getOrderById(String id);
}
