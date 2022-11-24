package seb.project.Codetech.recommend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import seb.project.Codetech.recommend.dto.RecommendDto;
import seb.project.Codetech.recommend.service.RecommendService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class RecommendController {

    private final RecommendService service;

    public RecommendController(RecommendService service){
        this.service = service;
    }

    @PostMapping("/recommend")
    public void addRecommend(@AuthenticationPrincipal String email,
                             @Valid @RequestBody RecommendDto post){
        service.editRecommend(email,post);
    }
}
