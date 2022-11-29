package seb.project.Codetech.mail.controller;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.mail.dto.MailCheckDto;
import seb.project.Codetech.mail.dto.MailDto;
import seb.project.Codetech.mail.service.MailService;

import java.util.Objects;
import java.util.concurrent.TimeUnit;

@RestController
@Validated
@RequestMapping("/api")
public class MailController {
    private final MailService mailService;
    private final RedisTemplate<String,String> redisTemplate;
    public MailController(MailService mailService, RedisTemplate<String,String> redisTemplate){
        this.mailService = mailService;
        this.redisTemplate = redisTemplate;
    }
    @PostMapping("/mail")
    public ResponseEntity<String> sendEmail(@RequestBody MailDto mailDto){
            String code = mailService.sendCertificationMail(mailDto.getEmail());
            redisTemplate.opsForValue()
                    .set(code, mailDto.getEmail(), 60 * 1000L, TimeUnit.MILLISECONDS);

            return ResponseEntity.ok("메세지가 전송되었습니다.");
    }

    @PostMapping("/mail/check")
    public ResponseEntity<String> checkEmail(@RequestBody MailCheckDto mailCheckDto){
        if(!Boolean.TRUE.equals(redisTemplate.hasKey(mailCheckDto.getCode()))){
            throw new BusinessLogicException(ExceptionCode.CODE_IS_DIFFERENT);
        }
        if(!Objects.equals(redisTemplate.opsForValue().get(mailCheckDto.getCode()), mailCheckDto.getEmail())){
            throw new BusinessLogicException(ExceptionCode.CODE_IS_DIFFERENT);
        }
        return ResponseEntity.ok("인증됨");
    }
}
