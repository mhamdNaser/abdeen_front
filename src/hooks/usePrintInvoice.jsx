import { jsPDF } from "jspdf";
import "jspdf-autotable";

const usePrintInvoice = (order) => {
  const printInvoice = async () => {
    if (!order) return;

    const convertToBase64 = (url) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          const reader = new FileReader();
          reader.onloadend = function () {
            resolve(reader.result);
          };
          reader.readAsDataURL(xhr.response);
        };
        xhr.onerror = function () {
          reject(new Error("Failed to load image"));
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
      });
    };

    const doc = new jsPDF();
    const logo = await convertToBase64("/image/logo.png");

    // Invoice border
    doc.setDrawColor(169, 169, 169);
    doc.rect(10, 10, 190, 277); // Full page border

    if (logo) {
      // Add border around the logo and company information
      doc.setDrawColor(0, 0, 0);
      doc.rect(14, 14, 182, 32);
      doc.addImage(logo, "PNG", 16, 20, 30, 20); // Logo
    }

    // Company information next to the logo
    doc.setFontSize(8);
    doc.text("Company Name", 60, 22);
    doc.text("Jordan / Aqaba", 60, 26);
    doc.text("Phone Number: (123) 456-7890", 60, 30);
    doc.text("Email: contact@company.com", 60, 34);

    // Tax number, commercial register, and license information
    doc.setFontSize(8);
    doc.text("Tax Number: 123456789", 140, 22);
    doc.text("Commercial Register: 987654321", 140, 26);
    doc.text("License Number: 567890123", 140, 30);
    doc.text("License Date: 01/01/2020", 140, 34);
    doc.text("License Expiry: 31/12/2025", 140, 38);

    // Border around the invoice title and customer information
    doc.setDrawColor(0, 0, 0);
    doc.rect(14, 50, 182, 60);

    // Invoice title
    doc.setFontSize(22);
    doc.text("Invoice", 16, 58);

    // Customer and invoice information
    doc.setFontSize(10);
    doc.text("Order ID:", 16, 70);
    doc.text(String(order.id), 60, 70);

    doc.text("User Name:", 16, 75);
    doc.text(String(order.user_name), 60, 75);

    doc.text("Status:", 16, 80);
    doc.text(String(order.status), 60, 80);

    doc.text("Date:", 16, 85);
    doc.text(String(order.created_at), 60, 85);

    // Adding payment ID and transaction ID
    doc.text("Payment ID:", 16, 90);
    doc.text(String(order.payment?.payment_id), 60, 90);

    doc.text("Transaction ID:", 16, 95);
    doc.text(String(order.payment?.transaction_id), 60, 95);

    // Customer address
    doc.text("Address:", 16, 100);
    order.address.forEach((address, index) => {
      doc.text(
        `${address.country} / ${address.state} / ${address.city} / ${address.address_1} / ${address.address_2} / ${address.address_3}`,
        60,
        100 + index * 10
      );
    });

    // Product details
    const productDetails = order.products.map((product) => [
      product.sku,
      product.en_name,
      product.quantity,
      product.product_price,
      `%${product.discount}`,
      `$${parseFloat(product.price * product.quantity).toFixed(2)}`,
    ]);

    // Adding a row containing the total price
    productDetails.push([
      "",
      "",
      "",
      "",
      "Total Price",
      `$${parseFloat(order.price - order.total_discount).toFixed(2)}`,
    ]);
    productDetails.push([
      "",
      "",
      "",
      "",
      "Tax",
      `$${parseFloat(order.tax).toFixed(2)}`,
    ]);
    productDetails.push([
      "",
      "",
      "",
      "",
      "Delivery",
      `$${parseFloat(order.delivery).toFixed(2)}`,
    ]);
    productDetails.push([
      "",
      "",
      "",
      "",
      "Net Amount",
      `$${parseFloat(order.total_price).toFixed(2)}`,
    ]);

    doc.autoTable({
      startY: 120,
      head: [
        [
          "ID",
          "Product Name",
          "Quantity",
          "Product Price",
          "Discount",
          "Price",
        ],
      ],
      body: productDetails,
    });


    doc.setDrawColor(0, 0, 0);
    doc.rect(14, 250, 182, 30);

    // Social media at the bottom of the page
    doc.setFontSize(8);
    doc.text("Social Media:", 16, 255);
    doc.text("Facebook: facebook.com/company", 16, 265);
    doc.text("Twitter: twitter.com/company", 16, 270);
    doc.text("Instagram: instagram.com/company", 16, 275);

    doc.setFontSize(8);
    doc.text("contact:", 100, 255);
    doc.text("WhatsApp: (123) 456-7890", 100, 265);
    doc.text("Fax: (123) 456-7890", 100, 270);
    doc.text("Email: company@gmail.com", 100, 275);

    doc.save(`invoice_${order.id}.pdf`);
  };

  return { printInvoice };
};

export default usePrintInvoice;
