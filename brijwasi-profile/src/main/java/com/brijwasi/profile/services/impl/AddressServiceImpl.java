package com.brijwasi.profile.services.impl;

import com.brijwasi.profile.dtos.AddressDTO;
import com.brijwasi.profile.dtos.AddressRequest;
import com.brijwasi.profile.models.Address;
import com.brijwasi.profile.repositories.AddressRepository;
import com.brijwasi.profile.services.AddressService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public List<AddressDTO> getAllAddresses(Long userId) {
        return addressRepository.findByUserIdAndIsActive(userId, true)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<AddressDTO> getAddressById(Long addressId, Long userId) {
        return addressRepository.findByIdAndUserId(addressId, userId)
                .map(this::convertToDTO);
    }

    @Override
    public AddressDTO createAddress(Long userId, AddressRequest request) {
        // If this is the first address or explicitly marked as default, set it as default
        boolean isDefault = request.getIsDefault() != null ? request.getIsDefault() : 
                           addressRepository.findByUserIdAndIsActive(userId, true).isEmpty();

        // Unset default flag on other addresses if needed
        if (isDefault) {
            addressRepository.findByUserIdAndIsActive(userId, true)
                    .forEach(addr -> {
                        addr.setIsDefault(false);
                        addressRepository.save(addr);
                    });
        }

        Address address = new Address();
        address.setUserId(userId);
        address.setLabel(request.getLabel());
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setZipCode(request.getZipCode());
        address.setCountry(request.getCountry());
        address.setMobileNumber(request.getMobileNumber());
        address.setLandmark(request.getLandmark());
        address.setIsDefault(isDefault);
        address.setIsActive(true);
        address.setCreatedAt(LocalDateTime.now());
        address.setUpdatedAt(LocalDateTime.now());

        return convertToDTO(addressRepository.save(address));
    }

    @Override
    public AddressDTO updateAddress(Long addressId, Long userId, AddressRequest request) {
        Address address = addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        boolean wasDefault = address.getIsDefault();
        boolean nowDefault = request.getIsDefault() != null ? request.getIsDefault() : address.getIsDefault();

        // If being set to default, unset others
        if (nowDefault && !wasDefault) {
            addressRepository.findByUserIdAndIsActive(userId, true)
                    .forEach(addr -> {
                        if (!addr.getId().equals(addressId)) {
                            addr.setIsDefault(false);
                            addressRepository.save(addr);
                        }
                    });
        }

        address.setLabel(request.getLabel());
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setZipCode(request.getZipCode());
        address.setCountry(request.getCountry());
        address.setMobileNumber(request.getMobileNumber());
        address.setLandmark(request.getLandmark());
        address.setIsDefault(nowDefault);
        address.setUpdatedAt(LocalDateTime.now());

        return convertToDTO(addressRepository.save(address));
    }

    @Override
    public void deleteAddress(Long addressId, Long userId) {
        Address address = addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        address.setIsActive(false);
        address.setUpdatedAt(LocalDateTime.now());

        // If deleting default, set next active as default
        if (address.getIsDefault()) {
            addressRepository.findByUserIdAndIsActive(userId, true).stream()
                    .findFirst()
                    .ifPresent(newDefault -> {
                        newDefault.setIsDefault(true);
                        addressRepository.save(newDefault);
                    });
        }

        addressRepository.save(address);
    }

    @Override
    public void setDefaultAddress(Long addressId, Long userId) {
        Address address = addressRepository.findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        // Unset all other defaults
        addressRepository.findByUserIdAndIsActive(userId, true)
                .forEach(addr -> {
                    addr.setIsDefault(false);
                    addressRepository.save(addr);
                });

        // Set this as default
        address.setIsDefault(true);
        address.setUpdatedAt(LocalDateTime.now());
        addressRepository.save(address);
    }

    @Override
    public Optional<AddressDTO> getDefaultAddress(Long userId) {
        return addressRepository.findByUserIdAndIsActive(userId, true).stream()
                .filter(Address::getIsDefault)
                .findFirst()
                .map(this::convertToDTO);
    }

    private AddressDTO convertToDTO(Address address) {
        AddressDTO dto = new AddressDTO();
        dto.setId(address.getId());
        dto.setUserId(address.getUserId());
        dto.setLabel(address.getLabel());
        dto.setStreet(address.getStreet());
        dto.setCity(address.getCity());
        dto.setState(address.getState());
        dto.setZipCode(address.getZipCode());
        dto.setCountry(address.getCountry());
        dto.setMobileNumber(address.getMobileNumber());
        dto.setLandmark(address.getLandmark());
        dto.setIsDefault(address.getIsDefault());
        dto.setIsActive(address.getIsActive());
        dto.setCreatedAt(address.getCreatedAt());
        dto.setUpdatedAt(address.getUpdatedAt());
        return dto;
    }
}
