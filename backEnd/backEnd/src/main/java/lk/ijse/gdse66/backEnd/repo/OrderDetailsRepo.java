package lk.ijse.gdse66.backEnd.repo;

import lk.ijse.gdse66.backEnd.entity.SaleDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepo extends JpaRepository<SaleDetails, String> {
}
