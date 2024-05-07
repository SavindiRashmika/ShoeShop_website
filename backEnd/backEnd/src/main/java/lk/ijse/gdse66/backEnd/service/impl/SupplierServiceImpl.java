package lk.ijse.gdse66.backEnd.service.impl;

import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.ItemDTO;
import lk.ijse.gdse66.backEnd.dto.SupplierDTO;
import lk.ijse.gdse66.backEnd.entity.Item;
import lk.ijse.gdse66.backEnd.entity.Supplier;
import lk.ijse.gdse66.backEnd.repo.SupplierRepo;
import lk.ijse.gdse66.backEnd.service.SupplierService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepo supplierRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveSupplier(SupplierDTO dto) {
        if (supplierRepo.existsById(dto.getCode())){
            throw new RuntimeException("Supplier Already exist. Please enter another id..!");
        }
        supplierRepo.save(mapper.map(dto, Supplier.class));

    }

    @Override
    public void updateSupplier(SupplierDTO dto) {
        if (!supplierRepo.existsById(dto.getCode())){
            throw new RuntimeException("update failed! supplierId : "+ dto.getCode());
        }
        supplierRepo.save(mapper.map(dto, Supplier.class));
    }

    @Override
    public void deleteSupplier(String id) {
        if (!supplierRepo.existsById(id)){
            throw new RuntimeException("Wrong ID..Please enter valid id..!");
        }
        supplierRepo.deleteById(id);

    }

    @Override
    public SupplierDTO searchSupId(String code) {
        Optional<Supplier> supplier = supplierRepo.findById(code);
        if (supplier == null) {
            throw new RuntimeException("supplier not found with code: " + code);
        }
        return mapper.map(supplier, SupplierDTO.class);
    }

    @Override
    public SupplierDTO searchSupId(String code,String name) {
        Supplier supplier = supplierRepo.findSupplierByCodeOrName(code, name);
        if (supplier == null) {
            throw new RuntimeException("supplier not found with code: " + code + " or name: " + name);
        }
        return mapper.map(supplier, SupplierDTO.class);
    }

    @Override
    public ArrayList<SupplierDTO> loadAllSupplier() {
        return mapper.map(supplierRepo.findAll(), new TypeToken<ArrayList<SupplierDTO>>() {
        }.getType());
    }

    @Override
    public CustomDTO supplierIdGenerate() {
        return new CustomDTO(supplierRepo.getLastIndex());
    }

    @Override
    public SupplierDTO getSumSupplier() {
        return null;
    }



}
