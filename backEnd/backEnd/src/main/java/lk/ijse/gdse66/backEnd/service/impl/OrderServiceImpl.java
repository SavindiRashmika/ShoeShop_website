package lk.ijse.gdse66.backEnd.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lk.ijse.gdse66.backEnd.dto.*;
import lk.ijse.gdse66.backEnd.entity.*;
import lk.ijse.gdse66.backEnd.enums.Level;
import lk.ijse.gdse66.backEnd.repo.*;
import lk.ijse.gdse66.backEnd.service.OrderService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Type;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
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

    @Autowired
    private AdminRepo adminRepo;


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
    public int getTodayOrders() {
        return orderRepo.getTodayOrders();
    }

    @Override
    public int getDayOrderQty() {
        return orderDetailsRepo.getDayOrderQty();
    }

    @Override
    public List<SaleDTO> findAllSalesForToday() {
        return mapper.map(orderRepo.findAllSalesForToday(), new TypeToken<List<SaleDTO>>() {
        }.getType());
    }

    @Override
    public CustomDTO OrderIdGenerate() {
        return new CustomDTO(orderRepo.getLastIndex());
    }



    @Override
    public void returnOrder(SaleDTO dto) {
        Sales sales = orderRepo.findById(dto.getOid())
                .orElseThrow(() -> new RuntimeException("Order with ID " + dto.getOid() + " not found."));

        String purchaseDateS = sales.getPurchaseDate();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime purchaseDate;
        try {
            purchaseDate = LocalDateTime.parse(purchaseDateS, formatter);
        } catch (DateTimeParseException e) {
            throw new RuntimeException("Invalid purchase date format.");
        }

        // Check if the purchase date is within the last 3 days
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime threeDaysAgo = now.minusDays(3);
        if (purchaseDate.isBefore(threeDaysAgo)) {
            throw new RuntimeException("Items purchased more than 3 days ago are not eligible for refund.");
        }

        double returnTotal = 0;

        for (SaleDetailsDTO saleDetailsDTO : dto.getSaleDetails()) {
            Item item = itemRepo.findById(saleDetailsDTO.getItemCode())
                    .orElseThrow(() -> new RuntimeException("Item with code " + saleDetailsDTO.getItemCode() + " not found."));

            // Validate return quantity
            SaleDetails saleDetail = sales.getSaleDetails().stream()
                    .filter(sd -> sd.getItemCode().equals(saleDetailsDTO.getItemCode()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Sale detail with item code " + saleDetailsDTO.getItemCode() + " not found."));

            if (saleDetailsDTO.getQty() > saleDetail.getQty()) {
                throw new RuntimeException("Return quantity exceeds purchased quantity.");
            }

            // Update item quantity in inventory
            item.setQty(item.getQty() + saleDetailsDTO.getQty());
            itemRepo.save(item);

            returnTotal += saleDetailsDTO.getQty() * item.getSalePrice();

            saleDetail.setQty(saleDetail.getQty() - saleDetailsDTO.getQty());
            if (saleDetail.getQty() <= 0) {
                sales.getSaleDetails().remove(saleDetail);
                orderDetailsRepo.delete(saleDetail);
            } else {
                orderDetailsRepo.save(saleDetail);
            }
        }

        double orderTotal = sales.getTotal();

        orderTotal -= returnTotal;
        sales.setTotal(orderTotal);
        if (sales.getSaleDetails().isEmpty()) {
            orderRepo.delete(sales);
        } else {
            orderRepo.save(sales);
        }


        if (returnTotal >= 800) {
            String customerCode = dto.getCustomer().getCode();
            Customer customer = customerRepo.findById(customerCode)
                    .orElseThrow(() -> new RuntimeException("Customer with ID " + customerCode + " not found."));
            int currentPoints = customer.getLoyaltyPoints();
            int newPoints = Math.max(0, currentPoints - 1);
            customer.setLoyaltyPoints(newPoints);
            updateLoyaltyLevel(customer);
            customerRepo.save(customer);
        }

        double todayIncome = adminRepo.getTodayIncome() - returnTotal;
        adminRepo.updateTodayIncome(todayIncome);
        System.out.println(todayIncome);
    }


    @Override
    public SaleDTO searchOrder(String code) {
        if (!orderRepo.existsById(code)) {
            throw new RuntimeException("Wrong ID. Please enter Valid id..!");
        }
        return mapper.map(orderRepo.findById(code).get(), SaleDTO.class);
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

    @Override
    public List<Object[]> getTopSellItemsForToday() {
        return orderDetailsRepo.findTopSellingItemForToday();
    }
}
