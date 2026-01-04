package com.todos.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class TodoRequest {
    private String title;
    private String description;
    private Boolean completed;
    private LocalDate dueDate;
    private String priority;
}
