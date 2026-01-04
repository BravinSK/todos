package com.todos.controller;

import com.todos.dto.TodoRequest;
import com.todos.model.Todo;
import com.todos.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos(@RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(todoService.getAllTodos(userId));
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestHeader("X-User-Id") String userId, @RequestBody TodoRequest request) {
        return ResponseEntity.ok(todoService.createTodo(userId, request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@RequestHeader("X-User-Id") String userId, @PathVariable String id, @RequestBody TodoRequest request) {
        return ResponseEntity.ok(todoService.updateTodo(id, userId, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@RequestHeader("X-User-Id") String userId, @PathVariable String id) {
        todoService.deleteTodo(id, userId);
        return ResponseEntity.ok().build();
    }
}
