package com.fixify.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateServiceRequest {
	
	private String title;
	private String description;
	private int mrpPrice;
	private int sellingPrice;
	private List<String> images;
	private String category;

}
