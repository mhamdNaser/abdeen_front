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

    // إطار الفاتورة
    doc.setDrawColor(169, 169, 169);
    doc.rect(10, 10, 190, 277); // إطار شامل للصفحة

    if (logo) {
      doc.addImage(logo, "PNG", 14, 14, 30, 20); // الشعار
    }

    // بيانات الشركة
    doc.setFontSize(8);
    doc.text("Company Name", 140, 18);
    doc.text("Jordan / Aqaba", 140, 24);
    doc.text("Tax Number", 140, 28);
    doc.text("Phone: (123) 456-7890", 140, 32);
    doc.text("Email: contact@company.com", 140, 36);

    // عنوان الفاتورة
    doc.setFontSize(22);
    doc.text("Invoice", 14, 50);

    // بيانات العميل والفاتورة
    doc.setFontSize(12);
    doc.text("Order ID:", 14, 70);
    doc.text(String(order.id), 60, 70);

    doc.text("User Name:", 14, 80);
    doc.text(String(order.user_name), 60, 80);

    doc.text("Status:", 14, 90);
    doc.text(String(order.status), 60, 90);

    doc.text("Date:", 14, 100);
    doc.text(String(order.created_at), 60, 100);

    // عنوان العميل
    doc.text("Address:", 14, 110);
    order.address.forEach((addres, index) => {
      doc.text(
        `${addres.country} / ${addres.state} / ${addres.city}`,
        60,
        110 + index * 10
      );
      doc.text(
        `${addres.address_1} / ${addres.address_2} / ${addres.address_3}`,
        60,
        120 + index * 10
      );
    });

    // // بيانات الأسعار والضرائب
    // const financialDetails = [
    //   ["Price", `$${parseFloat(order.price).toFixed(2)}`],
    //   ["Tax", `$${parseFloat(order.tax).toFixed(2)}`],
    //   ["Delivery", `$${parseFloat(order.delivery).toFixed(2)}`],
    //   [
    //     "Total Price",
    //     `$${parseFloat(order.delivery + order.tax + order.price).toFixed(2)}`,
    //   ],
    //   ["Total Discount", `$${parseFloat(order.total_discount).toFixed(2)}`],
    //   ["Net Amount", `$${parseFloat(order.total_price).toFixed(2)}`],
    // ];

    // let currentY = 130; // بدء موضع y لبيانات الأسعار والضرائب
    // financialDetails.forEach(([label, value]) => {
    //   doc.text(label + ":", 140, currentY);
    //   doc.text(value, 180, currentY);
    //   currentY += 10;
    // });

    // تفاصيل المنتجات
    const productDetails = order.products.map((product) => [
      product.sku,
      product.en_name,
      product.quantity,
      product.product_price,
      `%${product.discount}`,
      `$${parseFloat(product.price * product.quantity).toFixed(2)}`,
    ]);

    // إضافة سطر يحتوي على السعر الإجمالي
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
      startY: 130,
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

    doc.save(`invoice_${order.id}.pdf`);
  };

  return { printInvoice };
};

export default usePrintInvoice;
