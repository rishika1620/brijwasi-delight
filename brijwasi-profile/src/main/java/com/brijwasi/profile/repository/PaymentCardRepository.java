package com.brijwasi.profile.repository;

import com.brijwasi.profile.model.PaymentCard;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PaymentCardRepository extends JpaRepository<PaymentCard, Long> {
    List<PaymentCard> findByUserIdAndIsActive(Long userId, Boolean isActive);
    Optional<PaymentCard> findByIdAndUserId(Long id, Long userId);
    List<PaymentCard> findByUserId(Long userId);
}
