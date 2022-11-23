package seb.project.Codetech.recommend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import seb.project.Codetech.recommend.dto.RecommendDto;
import seb.project.Codetech.recommend.mapper.RecommendMapper;
import seb.project.Codetech.recommend.service.RecommendService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class RecommendController {

    private final RecommendService service;
    private final RecommendMapper mapper;

    public RecommendController(RecommendService service, RecommendMapper mapper){
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping("/recommend")
    public void addRecommend(@AuthenticationPrincipal String email,
                                                  @Valid @RequestBody RecommendDto post){
        service.editRecommend(email,post);
    }
}
