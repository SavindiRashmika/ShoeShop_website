package lk.ijse.gdse66.backEnd.service;

import lk.ijse.gdse66.backEnd.dto.CustomDTO;
import lk.ijse.gdse66.backEnd.dto.SupplierDTO;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

public interface SupplierService {

    void saveSupplier(SupplierDTO dto);
    void updateSupplier(SupplierDTO dto);
    void deleteSupplier(String id);
    SupplierDTO searchSupId(String id);
    ArrayList<SupplierDTO> loadAllSupplier();

    @ResponseBody
    CustomDTO supplierIdGenerate();
    SupplierDTO getSumSupplier();
}
