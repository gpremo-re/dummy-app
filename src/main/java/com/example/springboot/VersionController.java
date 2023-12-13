package com.example.springboot;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VersionController {

    @Value("${app.version}")
    private String appVersion;

    @GetMapping("version")
    public String getVersion() {
        return appVersion;
    }
}
