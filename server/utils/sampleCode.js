export const sampleCode = {
  javascript: `function calculateTotal(items, tax, discount, shipping, coupon, membership) {
  let total = 0;
  
  if (items && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].price) {
        if (items[i].quantity) {
          total += items[i].price * items[i].quantity;
        }
      }
    }
  }
  
  if (tax) {
    total = total + (total * tax);
  }
  
  if (discount) {
    total = total - discount;
  }
  
  return total;
}`,

  python: `def calculate_total(items, tax, discount, shipping, coupon, membership):
    total = 0
    
    if items and len(items) > 0:
        for i in range(len(items)):
            if items[i]['price']:
                if items[i]['quantity']:
                    total += items[i]['price'] * items[i]['quantity']
    
    if tax:
        total = total + (total * tax)
    
    if discount:
        total = total - discount
    
    return total`,

  java: `public class Calculator {
    public double calculateTotal(Item[] items, double tax, double discount, 
                                 double shipping, double coupon, boolean membership) {
        double total = 0;
        
        if (items != null && items.length > 0) {
            for (int i = 0; i < items.length; i++) {
                if (items[i].getPrice() > 0) {
                    if (items[i].getQuantity() > 0) {
                        total += items[i].getPrice() * items[i].getQuantity();
                    }
                }
            }
        }
        
        if (tax > 0) {
            total = total + (total * tax);
        }
        
        if (discount > 0) {
            total = total - discount;
        }
        
        return total;
    }
}`,

  c: `#include <stdio.h>

double calculate_total(double prices[], int quantities[], int n, 
                      double tax, double discount) {
    double total = 0;
    int i;
    
    if (prices != NULL && n > 0) {
        for (i = 0; i < n; i++) {
            if (prices[i] > 0) {
                if (quantities[i] > 0) {
                    total += prices[i] * quantities[i];
                }
            }
        }
    }
    
    if (tax > 0) {
        total = total + (total * tax);
    }
    
    if (discount > 0) {
        total = total - discount;
    }
    
    return total;
}`,

  cpp: `#include <vector>

class Calculator {
public:
    double calculateTotal(std::vector<double> prices, 
                         std::vector<int> quantities,
                         double tax, double discount, 
                         double shipping, double coupon) {
        double total = 0;
        
        if (!prices.empty() && prices.size() > 0) {
            for (size_t i = 0; i < prices.size(); i++) {
                if (prices[i] > 0) {
                    if (i < quantities.size() && quantities[i] > 0) {
                        total += prices[i] * quantities[i];
                    }
                }
            }
        }
        
        if (tax > 0) {
            total = total + (total * tax);
        }
        
        if (discount > 0) {
            total = total - discount;
        }
        
        return total;
    }
};`
};
