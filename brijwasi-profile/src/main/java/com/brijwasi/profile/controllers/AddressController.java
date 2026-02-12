package com.brijwasi.profile.controllers;

import com.brijwasi.profile.dtos.AddressDTO;
import com.brijwasi.profile.dtos.AddressRequest;
import com.brijwasi.profile.services.AddressService;
import com.brijwasi.profile.utils.StandardizedApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/profile/addresses")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    /**
     * Get all active addresses for the logged-in user
     */
    @GetMapping
    public ResponseEntity<StandardizedApiResponse<List<AddressDTO>>> getAllAddresses(
            @RequestHeader("X-User-Id") Long userId) {
        List<AddressDTO> addresses = addressService.getAllAddresses(userId);
        return ResponseEntity.ok(
                new StandardizedApiResponse<>(
                        true,
                        "Addresses retrieved successfully",
                        addresses,
                        HttpStatus.OK.value()
                )
        );
    }

    /**
     * Get a specific address by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<StandardizedApiResponse<AddressDTO>> getAddressById(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId) {
        return addressService.getAddressById(id, userId)
                .map(address -> ResponseEntity.ok(
                        new StandardizedApiResponse<>(
                                true,
                                "Address retrieved successfully",
                                address,
                                HttpStatus.OK.value()
                        )
                ))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new StandardizedApiResponse<>(
                                false,
                                "Address not found",
                                null,
                                HttpStatus.NOT_FOUND.value()
                        ))
                );
    }

    /**
     * Create a new address
     */
    @PostMapping
    public ResponseEntity<StandardizedApiResponse<AddressDTO>> createAddress(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody AddressRequest request) {
        AddressDTO address = addressService.createAddress(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new StandardizedApiResponse<>(
                        true,
                        "Address created successfully",
                        address,
                        HttpStatus.CREATED.value()
                ));
    }

    /**
     * Update an existing address
     */
    @PutMapping("/{id}")
    public ResponseEntity<StandardizedApiResponse<AddressDTO>> updateAddress(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody AddressRequest request) {
        AddressDTO address = addressService.updateAddress(id, userId, request);
        return ResponseEntity.ok(
                new StandardizedApiResponse<>(
                        true,
                        "Address updated successfully",
                        address,
                        HttpStatus.OK.value()
                )
        );
    }

    /**
     * Delete an address (soft delete)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<StandardizedApiResponse<Void>> deleteAddress(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId) {
        addressService.deleteAddress(id, userId);
        return ResponseEntity.ok(
                new StandardizedApiResponse<>(
                        true,
                        "Address deleted successfully",
                        null,
                        HttpStatus.OK.value()
                )
        );
    }

    /**
     * Set an address as default
     */
    @PutMapping("/{id}/set-default")
    public ResponseEntity<StandardizedApiResponse<Void>> setDefaultAddress(
            @PathVariable Long id,
            @RequestHeader("X-User-Id") Long userId) {
        addressService.setDefaultAddress(id, userId);
        return ResponseEntity.ok(
                new StandardizedApiResponse<>(
                        true,
                        "Default address updated successfully",
                        null,
                        HttpStatus.OK.value()
                )
        );
    }

    /**
     * Get default address
     */
    @GetMapping("/default")
    public ResponseEntity<StandardizedApiResponse<AddressDTO>> getDefaultAddress(
            @RequestHeader("X-User-Id") Long userId) {
        return addressService.getDefaultAddress(userId)
                .map(address -> ResponseEntity.ok(
                        new StandardizedApiResponse<>(
                                true,
                                "Default address retrieved successfully",
                                address,
                                HttpStatus.OK.value()
                        )
                ))
                .orElseGet(() -> ResponseEntity.ok(
                        new StandardizedApiResponse<>(
                                false,
                                "No default address found",
                                null,
                                HttpStatus.OK.value()
                        )
                ));
    }
}
