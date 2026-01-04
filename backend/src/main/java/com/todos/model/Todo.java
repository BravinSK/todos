package com.todos.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Data
@Document(collection = "todos")
public class Todo {
    @Id
    private String id;
    private String userId;
    private String title;
    private String description;
    private Boolean completed;
    private LocalDate dueDate;
    private String priority;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
