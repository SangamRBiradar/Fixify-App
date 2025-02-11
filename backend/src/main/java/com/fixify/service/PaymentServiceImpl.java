package com .fixify.service;

import java.util.Set;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fixify.entity.Order;
import com.fixify.entity.PaymentMethod;
import com.fixify.entity.PaymentOrder;
import com.fixify.entity.PaymentOrderStatus;
import com.fixify.entity.PaymentStatus;
import com.fixify.entity.User;
import com.fixify.repository.OrderRepository;
import com.fixify.repository.PaymentOrderRepository;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import lombok.RequiredArgsConstructor;


@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
	
	
	
	
	private final PaymentOrderRepository paymentOrderRepository;
	private final OrderRepository orderRepository;
//	private final OrderRepository cartRepository;
	
	@Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;
	
	@Override
	public PaymentOrder createOrder(User user, Set<Order> orders) {
		// TODO Auto-generated method stub
		
		Long amount=orders.stream().mapToLong(Order::getTotalSellingPrice).sum();
//        int couponPrice=cartRepository.findByUserId(user.getId()).getCouponPrice();

        PaymentOrder order=new PaymentOrder();
        order.setUser(user);
        order.setAmount(amount);
        order.setOrders(orders);
        order.setPaymentMethod(PaymentMethod.RAZORPAY);

        return paymentOrderRepository.save(order);
		
	}

	@Override
	public PaymentOrder getPaymentOrderById(Long orderId) throws Exception {
		// TODO Auto-generated method stub
		
        return paymentOrderRepository.findById(orderId).orElseThrow(()->new Exception("Payment order not found"));
		
	}

	@Override
	public PaymentOrder getPaymentOrderByPaymentId(String paymentLinkId) throws Exception {
		// TODO Auto-generated method stub
		PaymentOrder paymentOrder = paymentOrderRepository
                .findByPaymentLinkId(paymentLinkId);

        if(paymentOrder==null){
            throw new Exception("payment order not found with id "+paymentLinkId);
        }
        return paymentOrder;
	
	}

	@Override
	public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException {
		// TODO Auto-generated method stub
		
		  if(paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)){


              RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
              Payment payment = razorpay.payments.fetch(paymentId);

              Integer amount = payment.get("amount");
              String status = payment.get("status");

              if(status.equals("captured")){
//                  System.out.println("payment ===== captured");
                  Set<Order> orders=paymentOrder.getOrders();
                  for(Order order:orders){
                      order.setPaymentStatus(PaymentStatus.COMPLETED);
                      orderRepository.save(order);
                  }
                  paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                  paymentOrderRepository.save(paymentOrder);


                  return true;
              }
              paymentOrder.setStatus(PaymentOrderStatus.FAILED);
              paymentOrderRepository.save(paymentOrder);
              return false;
          }

          return false;


	}

	@Override
	public PaymentLink createRazorpayPaymentLink(User user, Long Amount, Long orderId) throws RazorpayException {
		
		Long amount = Amount * 100;


        try {
            // Instantiate a Razorpay client with your key ID and secret
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount",amount);
            paymentLinkRequest.put("currency","INR");

            // Create a JSON object with the customer details
            JSONObject customer = new JSONObject();
            customer.put("name",user.getFullName());

            customer.put("email",user.getEmail());
            paymentLinkRequest.put("customer",customer);

            // Create a JSON object with the notification settings
            JSONObject notify = new JSONObject();
            notify.put("email",true);
            paymentLinkRequest.put("notify",notify);

            // Set the reminder settings
            paymentLinkRequest.put("reminder_enable",true);

            // Set the callback URL and method
            paymentLinkRequest.put("callback_url","http://localhost:3000/payment-success/"+orderId);
            paymentLinkRequest.put("callback_method","get");

            PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

            String paymentLinkUrl = payment.get("short_url");
            String paymentLinkId = payment.get("id");

            System.out.println("payment ----- "+payment);

            return payment;

        } catch (RazorpayException e) {

            System.out.println("Error creating payment link: " + e.getMessage());
            throw new RazorpayException(e.getMessage());
        }
	}
	
	
}
