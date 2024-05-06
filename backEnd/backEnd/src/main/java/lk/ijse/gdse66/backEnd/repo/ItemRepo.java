package lk.ijse.gdse66.backEnd.repo;

import lk.ijse.gdse66.backEnd.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemRepo extends JpaRepository<Item,String> {
}
