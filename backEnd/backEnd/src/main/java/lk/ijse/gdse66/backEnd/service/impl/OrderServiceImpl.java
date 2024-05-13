package lk.ijse.gdse66.backEnd.service.impl;

import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.SaleDTO;
import lk.ijse.gdse66.backEnd.dto.SaleDetailsDTO;
import lk.ijse.gdse66.backEnd.entity.Sales;
import lk.ijse.gdse66.backEnd.repo.OrderRepo;
import lk.ijse.gdse66.backEnd.service.OrderService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private OrderRepo orderRepo;

    @Override
    public void placeOrder(SaleDTO dto) {
        if (orderRepo.existsById(dto.getOId())){
            throw new RuntimeException("Order Id "+ dto.getOId()+ "Already Exist.Please Enter another id..!");
        }
        orderRepo.save(mapper.map(dto, Sales.class));
    }

    @Override
    public ArrayList<SaleDTO> LoadOrders() {
        return mapper.map(orderRepo.findAll(), new TypeToken<ArrayList<SaleDTO>>() {
        }.getType());
    }

    @Override
    public ArrayList<SaleDetailsDTO> LoadOrderDetails() {
        return mapper.map(orderRepo.findAll(), new TypeToken<ArrayList<SaleDetailsDTO>>() {
        }.getType());
    }

    @Override
    public CustomDTO OrderIdGenerate() {
        return new CustomDTO(orderRepo.getLastIndex());
    }

    @Override
    public CustomDTO getSumOrders() {
        return null;
    }
}
