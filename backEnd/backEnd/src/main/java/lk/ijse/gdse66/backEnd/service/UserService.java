package lk.ijse.gdse66.backEnd.service;

import lk.ijse.gdse66.backEnd.dto.UserDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {
    UserDetailsService userDetailService();
    UserDTO searchUser(String id);
    UserDTO searchUserNam(String name);
    void deleteUser(String email);
}
