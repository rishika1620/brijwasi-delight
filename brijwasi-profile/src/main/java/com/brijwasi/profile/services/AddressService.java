package com.brijwasi.profile.services;

import com.brijwasi.profile.dtos.AddressDTO;
import com.brijwasi.profile.dtos.AddressRequest;
import com.brijwasi.profile.models.Address;

import java.util.List;
import java.util.Optional;

public interface AddressService {
    /**
     * Get all active addresses for a user
     */
    List<AddressDTO> getAllAddresses(Long userId);

    /**
     * Get a specific address by id and userId
     */
    Optional<AddressDTO> getAddressById(Long addressId, Long userId);

    /**
     * Create a new address for a user
     */
    AddressDTO createAddress(Long userId, AddressRequest request);

    /**
     * Update an existing address
     */
    AddressDTO updateAddress(Long addressId, Long userId, AddressRequest request);

    /**
     * Soft delete an address by marking it inactive
     */
    void deleteAddress(Long addressId, Long userId);

    /**
     * Set an address as default and unset other defaults
     */
    void setDefaultAddress(Long addressId, Long userId);

    /**
     * Get default address for a user
     */
    Optional<AddressDTO> getDefaultAddress(Long userId);
}
