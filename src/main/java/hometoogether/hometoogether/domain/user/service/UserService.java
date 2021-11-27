package hometoogether.hometoogether.domain.user.service;

import hometoogether.hometoogether.config.jwt.JwtTokenProvider;
import hometoogether.hometoogether.domain.user.domain.LoginRequest;
import hometoogether.hometoogether.domain.user.domain.PasswordFindReqeust;
import hometoogether.hometoogether.domain.user.domain.SignUpRequest;
import hometoogether.hometoogether.domain.user.domain.User;
import hometoogether.hometoogether.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.ArrayList;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public String signIn(LoginRequest loginRequest) throws Exception {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        } catch (Exception e) {
            throw new Exception("inavalid username/password");
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return tokenProvider.generateToken(authentication);
    }

    @Transactional
    public String singUp(SignUpRequest signUpRequest) {
        //TODO: username 중복체크 같이
        if (userRepository.existsUserByEmail(signUpRequest.getEmail())) {
            return "Email EXIST";
        } else if (userRepository.existsUserByUserName(signUpRequest.getUserName())) {
            return "USERNAME EXIST";
        }

        // Creating user's account
        signUpRequest.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        User user = signUpRequest.toEntity();
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        Role userRole = roleRepository.findByName(RoleName.ROLE_USER) .orElseThrow(() -> new AppException("User Role not set."));
//        user.setRoles(Collections.singleton(userRole));
        User result = userRepository.save(user);
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/{username}") .buildAndExpand(result.getEmail()).toUri();
        return String.valueOf(location);
    }

    @Transactional
    public String resetPassword(PasswordFindReqeust passwordFindReqeust) throws Exception {
        User user = userRepository.findUserByEmail(passwordFindReqeust.getEmail());

        if (user == null) {
            throw new Exception("유저가 없습니다.");
        }

        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        String generatedString = random.ints(leftLimit,rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        user.update(passwordEncoder.encode(generatedString));
        return generatedString;
    }

    public User findUser(String email) {
        return userRepository.findUserByEmail(email);
    }
}
