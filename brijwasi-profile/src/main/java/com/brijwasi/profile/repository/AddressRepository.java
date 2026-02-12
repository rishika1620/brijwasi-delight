package com.brijwasi.profile.repository;

import com.brijwasi.profile.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUserIdAndIsActive(Long userId, Boolean isActive);
    Optional<Address> findByIdAndUserId(Long id, Long userId);
    List<Address> findByUserId(Long userId);
}
