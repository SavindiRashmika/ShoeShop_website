package lk.ijse.gdse66.backEnd.controller;

import lk.ijse.gdse66.backEnd.auth.request.SignInRequest;
import lk.ijse.gdse66.backEnd.auth.request.SignUpRequest;
import lk.ijse.gdse66.backEnd.auth.response.JwtAuthResponse;
import lk.ijse.gdse66.backEnd.dto.UserDTO;
import lk.ijse.gdse66.backEnd.service.AuthenticationService;
import lk.ijse.gdse66.backEnd.service.UserService;
import lk.ijse.gdse66.backEnd.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/signIn")
    public ResponseEntity<JwtAuthResponse> signIn(@RequestBody SignInRequest signInRequest){
        return ResponseEntity.ok(authenticationService.signIn(signInRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthResponse> signUp(@RequestBody SignUpRequest signUpRequest){
        System.out.println(signUpRequest);
        return ResponseEntity.ok(authenticationService.signUp(signUpRequest));
    }
    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/search/{id}")
    public UserDTO getUser(@PathVariable("id") String id) {
        return userService.searchUser(id);
    }

    @GetMapping(path = "/searchUser")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO searchUserNam( @RequestParam String name){
        return userService.searchUserNam(name);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @DeleteMapping
    public ResponseUtil deleteItem(@RequestParam String email){
        userService.deleteUser(email);
        return new ResponseUtil("200", "Successfully Deleted. ",null);
    }
}
