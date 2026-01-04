package com.todos.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String userId;
    private String name;
    private String email;
}
