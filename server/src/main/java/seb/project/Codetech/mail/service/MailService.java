package seb.project.Codetech.mail.service;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import seb.project.Codetech.global.exception.BusinessLogicException;
import seb.project.Codetech.global.exception.ExceptionCode;
import seb.project.Codetech.user.entity.User;
import seb.project.Codetech.user.repository.UserRepository;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Optional;
import java.util.UUID;

@Service
public class MailService {
    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;

    public MailService(JavaMailSender javaMailSender, UserRepository userRepository){
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
    }
    private MimeMessage createMessage(String code, String email) throws Exception{
        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, email);
        message.setSubject("코드테크 이메일 인증 번호입니다.");
        message.setText("이메일 인증코드: "+code);

        message.setFrom(new InternetAddress("heakwangcodetech@naver.com"));

        return  message;
    }

    public void sendMail(String code, String email) throws Exception{
        try{
            MimeMessage mimeMessage = createMessage(code, email);
            javaMailSender.send(mimeMessage);
        }catch (MailException mailException){
            mailException.printStackTrace();
            throw new IllegalAccessException();
        }
    }

    public String sendCertificationMail(String email)  throws BusinessLogicException {
        if(nullUser(email).isPresent()){
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
        }
        try{
            String code = UUID.randomUUID().toString().substring(0, 6);
            sendMail(code, email);

            return code;
        }catch (Exception exception){
            exception.printStackTrace();
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
        }
    }

    public Optional<User> nullUser(String email){
        return userRepository.findByEmail(email);
    }
}
