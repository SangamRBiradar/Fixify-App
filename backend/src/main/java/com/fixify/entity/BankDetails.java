package com.fixify.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BankDetails {
	
	private String accountNumber;
	private String accountHolderName;
	private String ifscCode;

}
