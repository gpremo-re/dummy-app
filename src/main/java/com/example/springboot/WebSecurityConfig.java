package com.example.springboot;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import java.io.IOException;

@Configuration
@EnableWebSecurity
@Order(SecurityProperties.BASIC_AUTH_ORDER)
public class WebSecurityConfig {

//    private HttpFirewall allowUrlEncodedSlashHttpFirewall() {
//        DefaultHttpFirewall firewall = new DefaultHttpFirewall();
//        firewall.setAllowUrlEncodedSlash(true);
//        return firewall;
//    }
//
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring().requestMatchers(".webmanifest", "favicon.ico", "/*.js", "/*.css")
//            .and().httpFirewall(allowUrlEncodedSlashHttpFirewall());
//    }

    private static class NoPopupAuthenticationEntryPoint implements AuthenticationEntryPoint {
        @Override
        public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
        }
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        XorCsrfTokenRequestAttributeHandler delegate = new XorCsrfTokenRequestAttributeHandler();
//        delegate.setCsrfRequestAttributeName("_csrf");

        return http
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                .maximumSessions(2)
            )
//            .formLogin(login -> login.loginPage("/#/login").permitAll())
            .logout(logout -> logout.logoutUrl("logout").permitAll())
//            .logout(Customizer.withDefaults())
//            .httpBasic(Customizer.withDefaults())
            .httpBasic(httpBasic -> httpBasic.authenticationEntryPoint(new NoPopupAuthenticationEntryPoint()))
            .authorizeHttpRequests(requests -> requests
                .requestMatchers("/", "/index.html", ".webmanifest", "favicon.ico", "/*.js", "/*.css").permitAll()
                .anyRequest().authenticated()
            )
            .csrf(csrf -> csrf
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                .csrfTokenRequestHandler(delegate::handle)
            )
            .build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
                .username("user")
                .password("premo12321")
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(user);
    }
}
