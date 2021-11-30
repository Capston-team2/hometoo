package hometoogether.hometoogether.domain.training.repository;

import hometoogether.hometoogether.domain.training.domain.Routine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoutineRepository extends JpaRepository<Routine, Long> {
//    List<Routine> findAllByUserName(Long userId);
    List<Routine> findTop5ByOrderByRoutineAvgScoreDesc();
}

