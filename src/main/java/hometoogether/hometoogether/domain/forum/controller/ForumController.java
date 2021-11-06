package hometoogether.hometoogether.domain.forum.controller;

import hometoogether.hometoogether.domain.forum.domain.forum.ForumRequestDto;
import hometoogether.hometoogether.domain.forum.domain.forum.ForumResponseDto;
import hometoogether.hometoogether.domain.forum.service.ForumService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RequiredArgsConstructor
public class ForumController {

    private final ForumService forumService;

    @GetMapping("/forums")
    public List<ForumResponseDto> getList() {
        return forumService.getForumList();
    }

    @GetMapping("/forums/{id}")
    public ForumResponseDto getDetail(@PathVariable("id") Long forumId) {
        return forumService.getForumInfo(forumId);
    }

    @DeleteMapping("/forums/{id}")
    public String delete(@PathVariable("id") Long forumId) {
        forumService.deleteForum(forumId);
        return "Delete Success";
    }

    @PatchMapping("/forums/{id}")
    public Long update(@PathVariable("id") Long forumId, @RequestBody ForumRequestDto params) {
        return forumService.updateForum(forumId, params);
    }

    @PostMapping("/forums")
    public Long save(@RequestBody ForumRequestDto params) {
        return forumService.saveForum(params);
    }


}