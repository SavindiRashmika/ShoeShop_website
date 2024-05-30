package lk.ijse.gdse66.backEnd.service;

import lk.ijse.gdse66.backEnd.dto.AdminDTO;
import lk.ijse.gdse66.backEnd.util.ResponseUtil;

public interface AdminService {
     Double getTodayIncome();
     void saveAdmin(AdminDTO adminDTO);
}
