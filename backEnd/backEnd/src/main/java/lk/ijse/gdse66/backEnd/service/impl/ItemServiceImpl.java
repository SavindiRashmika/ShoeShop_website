package lk.ijse.gdse66.backEnd.service.impl;

import lk.ijse.gdse66.backEnd.dto.EmployeeDTO;
import lk.ijse.gdse66.backEnd.dto.ItemDTO;
import lk.ijse.gdse66.backEnd.entity.Item;
import lk.ijse.gdse66.backEnd.repo.ItemRepo;
import lk.ijse.gdse66.backEnd.service.ItemService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveItem(ItemDTO dto) {
        if (itemRepo.existsById(dto.getCode())) {
            throw new RuntimeException("Item Already Exist.Please enter another id..!");
        }
        itemRepo.save(mapper.map(dto, Item.class));
    }

    @Override
    public void updateItem(ItemDTO dto) {
        if (itemRepo.existsById(dto.getCode())) {
            throw new RuntimeException("update failed! employeeId : " + dto.getCode());
        }
        itemRepo.save(mapper.map(dto, Item.class));
    }

    @Override
    public void deleteItem(String id) {
        if (itemRepo.existsById(id)) {
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
        itemRepo.deleteById(id);
    }

    @Override
    public ItemDTO searchItemId(String code) {
        if (!itemRepo.existsById(code)) {
            throw new RuntimeException("Wrong ID. Please enter Valid id..!");
        }
        Item item = itemRepo.findById(code).get();
        return mapper.map(item, ItemDTO.class);
    }

    @Override
    public ArrayList<ItemDTO> loadAllItem() {
        return mapper.map(itemRepo.findAll(), new TypeToken<ArrayList<ItemDTO>>() {
        }.getType());
    }
}