package com.brijwasi.profile.services.impl;

import com.brijwasi.profile.dtos.PaymentCardDTO;
import com.brijwasi.profile.dtos.PaymentCardRequest;
import com.brijwasi.profile.models.PaymentCard;
import com.brijwasi.profile.repositories.PaymentCardRepository;
import com.brijwasi.profile.services.PaymentCardService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class PaymentCardServiceImpl implements PaymentCardService {

    private final PaymentCardRepository paymentCardRepository;

    public PaymentCardServiceImpl(PaymentCardRepository paymentCardRepository) {
        this.paymentCardRepository = paymentCardRepository;
    }

    @Override
    public List<PaymentCardDTO> getAllPaymentCards(Long userId) {
        return paymentCardRepository.findByUserIdAndIsActive(userId, true)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PaymentCardDTO> getPaymentCardById(Long cardId, Long userId) {
        return paymentCardRepository.findByIdAndUserId(cardId, userId)
                .map(this::convertToDTO);
    }

    @Override
    public PaymentCardDTO addPaymentCard(Long userId, PaymentCardRequest request) {
        // If this is the first card or explicitly marked as default, set it as default
        boolean isDefault = request.getIsDefault() != null ? request.getIsDefault() : 
                           paymentCardRepository.findByUserIdAndIsActive(userId, true).isEmpty();

        // Unset default flag on other cards if needed
        if (isDefault) {
            paymentCardRepository.findByUserIdAndIsActive(userId, true)
                    .forEach(card -> {
                        card.setIsDefault(false);
                        paymentCardRepository.save(card);
                    });
        }

        PaymentCard card = new PaymentCard();
        card.setUserId(userId);
        card.setCardType(request.getCardType());
        card.setCardHolderName(request.getCardHolderName());
        card.setCardNumber(request.getCardNumber());
        card.setExpiryMonth(request.getExpiryMonth());
        card.setExpiryYear(request.getExpiryYear());
        card.setUpiId(request.getUpiId());
        card.setIsDefault(isDefault);
        card.setIsActive(true);
        card.setCreatedAt(LocalDateTime.now());
        card.setUpdatedAt(LocalDateTime.now());

        return convertToDTO(paymentCardRepository.save(card));
    }

    @Override
    public PaymentCardDTO updatePaymentCard(Long cardId, Long userId, PaymentCardRequest request) {
        PaymentCard card = paymentCardRepository.findByIdAndUserId(cardId, userId)
                .orElseThrow(() -> new RuntimeException("Payment card not found"));

        boolean wasDefault = card.getIsDefault();
        boolean nowDefault = request.getIsDefault() != null ? request.getIsDefault() : card.getIsDefault();

        // If being set to default, unset others
        if (nowDefault && !wasDefault) {
            paymentCardRepository.findByUserIdAndIsActive(userId, true)
                    .forEach(c -> {
                        if (!c.getId().equals(cardId)) {
                            c.setIsDefault(false);
                            paymentCardRepository.save(c);
                        }
                    });
        }

        card.setCardType(request.getCardType());
        card.setCardHolderName(request.getCardHolderName());
        card.setCardNumber(request.getCardNumber());
        card.setExpiryMonth(request.getExpiryMonth());
        card.setExpiryYear(request.getExpiryYear());
        card.setUpiId(request.getUpiId());
        card.setIsDefault(nowDefault);
        card.setUpdatedAt(LocalDateTime.now());

        return convertToDTO(paymentCardRepository.save(card));
    }

    @Override
    public void deletePaymentCard(Long cardId, Long userId) {
        PaymentCard card = paymentCardRepository.findByIdAndUserId(cardId, userId)
                .orElseThrow(() -> new RuntimeException("Payment card not found"));

        card.setIsActive(false);
        card.setUpdatedAt(LocalDateTime.now());

        // If deleting default, set next active as default
        if (card.getIsDefault()) {
            paymentCardRepository.findByUserIdAndIsActive(userId, true).stream()
                    .findFirst()
                    .ifPresent(newDefault -> {
                        newDefault.setIsDefault(true);
                        paymentCardRepository.save(newDefault);
                    });
        }

        paymentCardRepository.save(card);
    }

    @Override
    public void setDefaultPaymentCard(Long cardId, Long userId) {
        PaymentCard card = paymentCardRepository.findByIdAndUserId(cardId, userId)
                .orElseThrow(() -> new RuntimeException("Payment card not found"));

        // Unset all other defaults
        paymentCardRepository.findByUserIdAndIsActive(userId, true)
                .forEach(c -> {
                    c.setIsDefault(false);
                    paymentCardRepository.save(c);
                });

        // Set this as default
        card.setIsDefault(true);
        card.setUpdatedAt(LocalDateTime.now());
        paymentCardRepository.save(card);
    }

    @Override
    public Optional<PaymentCardDTO> getDefaultPaymentCard(Long userId) {
        return paymentCardRepository.findByUserIdAndIsActive(userId, true).stream()
                .filter(PaymentCard::getIsDefault)
                .findFirst()
                .map(this::convertToDTO);
    }

    private PaymentCardDTO convertToDTO(PaymentCard card) {
        PaymentCardDTO dto = new PaymentCardDTO();
        dto.setId(card.getId());
        dto.setUserId(card.getUserId());
        dto.setCardType(card.getCardType());
        dto.setCardHolderName(card.getCardHolderName());
        dto.setCardNumber(card.getCardNumber());
        dto.setExpiryMonth(card.getExpiryMonth());
        dto.setExpiryYear(card.getExpiryYear());
        dto.setUpiId(card.getUpiId());
        dto.setIsDefault(card.getIsDefault());
        dto.setIsActive(card.getIsActive());
        dto.setCreatedAt(card.getCreatedAt());
        dto.setUpdatedAt(card.getUpdatedAt());
        return dto;
    }
}
