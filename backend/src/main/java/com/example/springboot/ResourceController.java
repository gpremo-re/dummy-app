package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class ResourceController {
    public record Greeting(String id, String content) {
    }

    @GetMapping("resource")
    public Greeting resource() {
        return new Greeting(UUID.randomUUID().toString(), "Hello World!");
    }
}
