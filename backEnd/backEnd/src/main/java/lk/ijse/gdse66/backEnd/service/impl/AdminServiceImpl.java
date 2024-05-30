package lk.ijse.gdse66.backEnd.service.impl;

import lk.ijse.gdse66.backEnd.dto.AdminDTO;
import lk.ijse.gdse66.backEnd.entity.Admin;
import lk.ijse.gdse66.backEnd.repo.AdminRepo;
import lk.ijse.gdse66.backEnd.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Double getTodayIncome() {
        return adminRepo.getTodayIncome();
    }

    @Override
    public void saveAdmin(AdminDTO adminDTO) {
        adminRepo.save(mapper.map(adminDTO, Admin.class));
    }
}
