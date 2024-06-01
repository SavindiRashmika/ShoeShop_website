package lk.ijse.gdse66.backEnd.service.impl;

import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.EmployeeDTO;
import lk.ijse.gdse66.backEnd.dto.ItemDTO;
import lk.ijse.gdse66.backEnd.dto.SupplierDTO;
import lk.ijse.gdse66.backEnd.entity.Employee;
import lk.ijse.gdse66.backEnd.entity.Item;
import lk.ijse.gdse66.backEnd.repo.ItemRepo;
import lk.ijse.gdse66.backEnd.service.ItemService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private ModelMapper mapper;

    private int count =0;
    @Override
    public void saveItem(ItemDTO dto) {
        if (itemRepo.existsById(dto.getCode())) {
            count += dto.getQty();
            throw new RuntimeException("Item Already Exist.Please enter another id..!");
        }
        System.out.println("item count: " + count);
        itemRepo.save(mapper.map(dto, Item.class));
    }

    @Override
    public void updateItem(ItemDTO dto) {
        if (!itemRepo.existsById(dto.getCode())) {
            throw new RuntimeException("update failed! employeeId : " + dto.getCode());
        }
        itemRepo.save(mapper.map(dto, Item.class));
    }

    @Override
    public void deleteItem(String id) {
        if (!itemRepo.existsById(id)) {
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
        itemRepo.deleteById(id);
    }

    @Override
    public ItemDTO searchItemId(String code, String name) {
         Item item = itemRepo.findItemByCodeOrName(code, name);
        if (item == null) {
            throw new RuntimeException("item not found with code: " + code + " or name: " + name);
        }
        return mapper.map(item, ItemDTO.class);
    }

    @Override
    public ItemDTO searchItemId(String code) {
        Optional<Item> item = itemRepo.findById(code);
        if (item == null) {
            throw new RuntimeException("item not found with code: " + code);
        }
        return mapper.map(item, ItemDTO.class);
    }

    @Override
    public ArrayList<ItemDTO> loadAllItem() {
        return mapper.map(itemRepo.findAll(), new TypeToken<ArrayList<ItemDTO>>() {
        }.getType());
    }

    @Override
    public CustomDTO getItemCount() {
        return new CustomDTO(itemRepo.getItemCount());
    }

    @Override
    public Double getTodayExpectedProfit() {
        LocalDate today = LocalDate.now();
        return itemRepo.findTodayExpectedProfit(today);
    }

    @Override
    public CustomDTO getItemQty() {
        return new CustomDTO(itemRepo.getItemQty());
    }
}
