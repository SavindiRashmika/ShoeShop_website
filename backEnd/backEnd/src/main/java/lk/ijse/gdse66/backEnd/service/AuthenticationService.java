package lk.ijse.gdse66.backEnd.service;

import lk.ijse.gdse66.backEnd.auth.request.SignInRequest;
import lk.ijse.gdse66.backEnd.auth.request.SignUpRequest;
import lk.ijse.gdse66.backEnd.auth.response.JwtAuthResponse;

public interface AuthenticationService {

    JwtAuthResponse signIn(SignInRequest signInRequest);
    JwtAuthResponse signUp(SignUpRequest signUpRequest);

}
