package com.fixify.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddItemRequest {
	private String size;
	private int quantity;
	private Long serviceId;

}
