package hometoogether.hometoogether.domain.forum.service;

import hometoogether.hometoogether.domain.forum.domain.forum.Forum;
import hometoogether.hometoogether.domain.forum.domain.forum.ForumRequestDto;
import hometoogether.hometoogether.domain.forum.domain.forum.ForumResponseDto;
import hometoogether.hometoogether.domain.forum.repository.ForumRepository;
import hometoogether.hometoogether.exception.CustomException;
import hometoogether.hometoogether.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ForumService {
    private final ForumRepository forumRepository;

    public List<ForumResponseDto> getForumList() {
        // 최신순 (date 역순으로 정렬)
        Sort sort = Sort.by(Sort.Direction.DESC, "createDate");
        List<Forum> forums = forumRepository.findAll(sort);
        return forums.stream().map(ForumResponseDto::new).collect(Collectors.toList());
    }

    public ForumResponseDto getForumInfo(Long id) {
        Optional<Forum> forum = forumRepository.findById(id);
        return new ForumResponseDto(forum.get());
    }

    @Transactional
    public void deleteForum(Long forumId) {
        forumRepository.deleteById(forumId);
    }

    @Transactional
    public Long updateForum(Long forumId, ForumRequestDto param) {
        Forum forum = forumRepository.findById(forumId).orElseThrow(
                () -> new CustomException(ErrorCode.POSTS_NOT_FOUND)
        );
        forum.update(param.getTitle(), param.getContents(), param.getWriter());
        return forumId;
    }

    @Transactional
    public Long saveForum(ForumRequestDto forumRequestDto) {
        Forum forum = forumRepository.save(forumRequestDto.toEntity());
        return forum.getForumId();
    }

}