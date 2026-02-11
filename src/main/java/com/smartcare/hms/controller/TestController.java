package com.smartcare.hms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/test")
    public String testJwt() {
        return "JWT ACCESS SUCCESS ✅";
    }
}
