package com.todos.controller;

import com.todos.dto.AuthResponse;
import com.todos.dto.SignInRequest;
import com.todos.dto.SignUpRequest;
import com.todos.model.User;
import com.todos.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUp(@RequestBody SignUpRequest request, HttpSession session) {
        User user = authService.signUp(request);
        session.setAttribute("userId", user.getId());
        
        AuthResponse response = new AuthResponse();
        response.setUserId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@RequestBody SignInRequest request, HttpSession session) {
        User user = authService.signIn(request);
        session.setAttribute("userId", user.getId());
        
        AuthResponse response = new AuthResponse();
        response.setUserId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signout")
    public ResponseEntity<Void> signOut(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().build();
    }
}
