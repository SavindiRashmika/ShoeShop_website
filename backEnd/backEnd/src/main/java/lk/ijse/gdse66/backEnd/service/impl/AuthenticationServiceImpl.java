package lk.ijse.gdse66.backEnd.service.impl;

import lk.ijse.gdse66.backEnd.auth.request.SignInRequest;
import lk.ijse.gdse66.backEnd.auth.request.SignUpRequest;
import lk.ijse.gdse66.backEnd.auth.response.JwtAuthResponse;
import lk.ijse.gdse66.backEnd.dto.UserDTO;
import lk.ijse.gdse66.backEnd.entity.User;
import lk.ijse.gdse66.backEnd.enums.Role;
import lk.ijse.gdse66.backEnd.repo.UserRepo;
import lk.ijse.gdse66.backEnd.service.AuthenticationService;
import lk.ijse.gdse66.backEnd.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final ModelMapper mapper;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public JwtAuthResponse signIn(SignInRequest signInRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword()));
        User user = userRepo.findByEmail(signInRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("user not found"));
        String generatedToken = jwtService.generateToken(user);
        return JwtAuthResponse.builder().token(generatedToken).build();

    }

    @Override
    public JwtAuthResponse signUp(SignUpRequest signUpRequest) {
        UserDTO userDTO = UserDTO.builder()
                .id(UUID.randomUUID().toString())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .role(Role.valueOf(signUpRequest.getRole()))
                .build();
        User savedUser = userRepo.save(mapper.map(userDTO, User.class));
        String generatedToken = jwtService.generateToken(savedUser);
        return JwtAuthResponse.builder().token(generatedToken).build();

    }
}
