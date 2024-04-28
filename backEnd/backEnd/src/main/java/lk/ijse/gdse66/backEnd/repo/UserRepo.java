package lk.ijse.gdse66.backEnd.repo;

import lk.ijse.gdse66.backEnd.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,String> {
}
