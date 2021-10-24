package hometoogether.hometoogether.domain.challenge.service;

import hometoogether.hometoogether.domain.challenge.dto.ChallengeDetailResponseDto;
import hometoogether.hometoogether.domain.challenge.dto.ChallengeRequestDto;
import hometoogether.hometoogether.domain.challenge.dto.ChallengeResponseDto;
import hometoogether.hometoogether.domain.challenge.domain.Challenge;
import hometoogether.hometoogether.domain.challenge.repository.ChallengeRepository;
import hometoogether.hometoogether.domain.pose.domain.ChallengePose;
import hometoogether.hometoogether.domain.pose.domain.PoseInfo;
import hometoogether.hometoogether.domain.pose.service.PoseService;
import hometoogether.hometoogether.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final PoseService poseService;

    @Value("${spring.servlet.multipart.location}")
    String videoPath;

    @Transactional
    public Long saveChallenge(ChallengeRequestDto challengeRequestDto) throws IOException {
        // parameter로 SessionUser 받아오게 구현 예정

        //ChallengePose 생성
        //url, poseInfo, user
        MultipartFile multipartFile = challengeRequestDto.getFile();
        String url = UUID.randomUUID().toString() + "_" + multipartFile.getOriginalFilename();
        File file = new File(url);
        multipartFile.transferTo(file);

        PoseInfo poseInfo = poseService.estimatePose(url);
        User user = new User();

        ChallengePose challengePose = ChallengePose.builder()
                .url(url)
                .contentType(multipartFile.getContentType())
                .poseInfo(poseInfo)
                .user(user)
                .build();

        //challengePose <-> (poseInfo, user) 상호 매핑
        poseInfo.setPose(challengePose);
        List<ChallengePose> challengePoseList = user.getChallengePoseList();
        challengePoseList.add(challengePose);
        user.setChallengePoseList(challengePoseList);

        //Challenge 생성
        Challenge challenge = Challenge.builder()
                .challengePose(challengePose)
                .title(challengeRequestDto.getTitle())
                .context(challengeRequestDto.getContext())
                .build();

        //challengePose <-> challenge 상호 매핑
        challengePose.setChallenge(challenge);

        return challengeRepository.save(challenge).getId();
    }

    public ChallengeDetailResponseDto getChallenge(Long challengeId) throws IOException {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + challengeId));
//        Path path = Paths.get(videoPath + challenge.getChallengePose().getUrl());
//        Resource resource = new InputStreamResource(Files.newInputStream(path));
        return new ChallengeDetailResponseDto(challenge);
    }

    public List<ChallengeResponseDto> getChallengeList() {
        Sort sort = Sort.by(Sort.Direction.DESC, "create_date");
        List<Challenge> challenges = challengeRepository.findAll(sort);
        return challenges.stream().map(ChallengeResponseDto::new).collect(Collectors.toList());
    }

    @Transactional
    public Long updateChallenge(Long challengeId, ChallengeRequestDto param) {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + challengeId));
        ChallengePose challengePose = challenge.getChallengePose();
//        challengePose.setUrl(param.getUrl());
        challenge.update(challengePose, param.getTitle(), param.getContext());
        return challengeId;
    }

    @Transactional
    public Long deleteChallenge(Long challengeId) {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + challengeId));
        challengeRepository.delete(challenge);
        return challengeId;
    }
}
