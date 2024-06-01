package lk.ijse.gdse66.backEnd.service.impl;

import lk.ijse.gdse66.backEnd.dto.UserDTO;
import lk.ijse.gdse66.backEnd.entity.User;
import lk.ijse.gdse66.backEnd.repo.UserRepo;
import lk.ijse.gdse66.backEnd.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

   // private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final ModelMapper modelMapper;

    @Override
    public UserDetailsService userDetailService() {
        return username -> userRepo.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("user not found"));
    }

    @Override
    public UserDTO searchUser(String id) {
        return (UserDTO) userRepo.findByEmail(id).map(user -> modelMapper.map(user, UserDTO.class)).orElseThrow(() -> new RuntimeException("User Not Exist"));

    }

    @Override
    public UserDTO searchUserNam(String name) {
        User user = userRepo.findUserByName( name);
        if (user == null) {
            throw new RuntimeException("Employee not found with name: " + name);
        }
        return modelMapper.map(user, UserDTO.class);

    }

    @Override
    public void deleteUser(String email) {
        userRepo.deleteById(email);
    }
}
