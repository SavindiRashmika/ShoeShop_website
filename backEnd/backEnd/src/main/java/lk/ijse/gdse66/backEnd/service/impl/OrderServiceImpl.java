package lk.ijse.gdse66.backEnd.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.CustomerDTO;
import lk.ijse.gdse66.backEnd.dto.SaleDTO;
import lk.ijse.gdse66.backEnd.dto.SaleDetailsDTO;
import lk.ijse.gdse66.backEnd.entity.Customer;
import lk.ijse.gdse66.backEnd.entity.Item;
import lk.ijse.gdse66.backEnd.entity.SaleDetails;
import lk.ijse.gdse66.backEnd.entity.Sales;
import lk.ijse.gdse66.backEnd.enums.Level;
import lk.ijse.gdse66.backEnd.repo.CustomerRepo;
import lk.ijse.gdse66.backEnd.repo.ItemRepo;
import lk.ijse.gdse66.backEnd.repo.OrderDetailsRepo;
import lk.ijse.gdse66.backEnd.repo.OrderRepo;
import lk.ijse.gdse66.backEnd.service.OrderService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private OrderDetailsRepo orderDetailsRepo;

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private CustomerRepo customerRepo;



    @Override
    public void placeOrder(SaleDTO dto) {
        if (orderRepo.existsById(dto.getOid())){
            throw new RuntimeException("Order Id "+ dto.getOid()+ "Already Exist.Please Enter another id..!");
        }

        Sales save = orderRepo.save(mapper.map(dto, Sales.class));

        for (SaleDetailsDTO saleDetailsDTO : dto.getSaleDetails()) {
            if (saleDetailsDTO.getItemCode() == null) {
                throw new IllegalArgumentException("Code must not be null for sale details");
            }
        }

        if (dto.getTotal() >= 800) {
            String customerCode = dto.getCustomer().getCode();
            Customer customer = customerRepo.findById(customerCode)
                    .orElseThrow(() -> new RuntimeException("Customer with ID " + customerCode + " not found."));
            if (customer != null) {
                int currentPoints = customer.getLoyaltyPoints();
                int newPoints = currentPoints + 1;
                customer.setLoyaltyPoints(newPoints);
                updateLoyaltyLevel(customer);
                customerRepo.save(customer);
            }
        }

        for (SaleDetails sd : save.getSaleDetails()) {
            Item item = itemRepo.findById(sd.getItemCode()).get();
            item.setQty(item.getQty() - sd.getQty());
            itemRepo.save(item);
        }
    }

    private void updateLoyaltyLevel(Customer customer) {
        int totalPoints = customer.getLoyaltyPoints();
        if (totalPoints >= 200) {
            customer.setLevel(Level.GOLD);
        } else if (totalPoints >= 100) {
            customer.setLevel(Level.SILVER);
        } else if (totalPoints >= 50) {
            customer.setLevel(Level.BRONZE);
        } else {
            customer.setLevel(Level.NEW);
        }
    }

    @Override
    public ArrayList<SaleDTO> LoadOrders() {
        return mapper.map(orderRepo.findAll(), new TypeToken<ArrayList<SaleDTO>>() {
        }.getType());
    }

    @Override
    public ArrayList<SaleDetailsDTO> LoadOrderDetails() {
        return mapper.map(orderDetailsRepo.findAll(), new TypeToken<ArrayList<SaleDetailsDTO>>() {
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

    @Override
    public SaleDetails getOrderById(String id) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("ID must not be null or empty");
        }

        Optional<SaleDetails> optionalSaleDetails = orderDetailsRepo.findById(id);

        if (optionalSaleDetails.isPresent()) {
            return optionalSaleDetails.get();
        } else {
            throw new EntityNotFoundException("Order with id " + id + " not found");
        }
    }
}
