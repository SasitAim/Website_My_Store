// Product Page

//  JS product page filter brand and sort by price
const brandFilter = document.getElementById('brandFilter');
const priceSort = document.getElementById('priceSort');
const productsContainer = document.querySelector('.row.row-cols-1');

function filterAndSortProducts() {
  let products = Array.from(productsContainer.children);
  let brand = brandFilter.value;
  let sort = priceSort.value;

  // Filter by Brand
  products.forEach(product => {
    if (brand === 'all' || product.dataset.brand === brand) {
      product.style.display = '';
    } else {
      product.style.display = 'none';
    }
  });

  // Sort by Price
  if (sort !== 'none') {
    products.sort((a, b) => {
      let priceA = parseInt(a.dataset.price);
      let priceB = parseInt(b.dataset.price);
      return sort === 'asc' ? priceA - priceB : priceB - priceA;
    });
    products.forEach(p => productsContainer.appendChild(p));
  }
}

if (brandFilter && priceSort && productsContainer) {
  brandFilter.addEventListener('change', filterAndSortProducts);
  priceSort.addEventListener('change', filterAndSortProducts);
}




// Contact page
let contactList = JSON.parse(localStorage.getItem("contacts")) || [];

function GetContactInf() {
  // ดึงข้อความจากช่องกรอกข้อมูล
  const FirstN_ContP = document.getElementById("firstName_ContP").value;
  const LastN_ContP = document.getElementById("lastName_ContP").value;
  const Email_ContP = document.getElementById("email_ContP").value;
  const Phone_ContP = document.getElementById("Phone_Cont").value;
  const Mass_P = document.getElementById("massage_Cont").value;

  // เตือนให้ใส่ข้อมูลให้ครบ (ห้ามปล่อยว่าง)
  if (!FirstN_ContP || !LastN_ContP || !Email_ContP || !Phone_ContP || !Mass_P) {
    alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
    return;
  }

  // ดึงค่าที่กรอกข้อมูลมา
  const contactData = {
    firstName: FirstN_ContP,
    lastName: LastN_ContP,
    email: Email_ContP,
    phone: Phone_ContP,
    message: Mass_P,
    date: new Date().toLocaleString()
  };

  // Array object >> เพิ่ม Object ลง Array
  contactList.push(contactData);
  localStorage.setItem("contacts", JSON.stringify(contactList));

  // Check
  console.log("Contact List", contactList);

  // เคลียร์ฟอร์มหลังบันทึกแล้ว
  document.getElementById("firstName_ContP").value = "";
  document.getElementById("lastName_ContP").value = "";
  document.getElementById("email_ContP").value = "";
  document.getElementById("Phone_Cont").value = "";
  document.getElementById("massage_Cont").value = "";

  alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
}

// ---------------------------------------------------------------------------------------------------------------
// 2 Product and Cart 
// ---------------------------------------------------------------------------------------------------------------

// โหลดตะกร้าจาก localStorage (ถ้ามี)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// บันทึกตะกร้าไปที่ localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// เพิ่มสินค้าเข้าตะกร้า
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart(); // บันทึก
  renderCart(); // อัปเดตแสดงผล
  alert(`${name} added to cart!`);
}

// ลบสินค้าออกจากตะกร้า
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
  renderCart();
}

// ฟังก์ชันแสดงผลตะกร้า
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartTotal) return; // ป้องกัน error ถ้าไม่ใช่หน้า cart.html

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<li class="list-group-item text-center">Your cart is empty</li>`;
    cartTotal.innerText = "0.00 Baht";
    return;
  }

  cart.forEach((item) => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    li.innerHTML = `
      <div>
        <h6 class="my-0">${item.name}</h6>
        <small class="text-body-secondary">Qty: ${item.quantity} × ${item.price.toLocaleString()}</small>
      </div>
      <span class="text-body-secondary">${itemTotal.toLocaleString()} Baht</span>
    `;

    // ปุ่มลบ
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'btn btn-sm btn-danger ms-2';
    removeBtn.addEventListener('click', () => removeFromCart(item.name));
    li.appendChild(removeBtn);

    cartItemsContainer.appendChild(li);
  });

  cartTotal.innerText = total.toLocaleString() + " Baht";
}

// Event Listener สำหรับปุ่ม Add to Cart (ในหน้า Product)
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (event) => {
    const productCol = event.target.closest('.col');
    const productName = productCol.dataset.name;
    const productPrice = parseFloat(productCol.dataset.price);
    addToCart(productName, productPrice);
  });
});

// โหลด cart เวลาเปิดหน้า cart.html
document.addEventListener("DOMContentLoaded", renderCart);

// ---------------------------------------------------------------------------------------------------------------
// Cart เก็บข้อมูลที่อยู่, ข้อมูลการจ่ายเงิน และสินค้า
// ประกาศ 
let billList = JSON.parse(localStorage.getItem("billAddress")) || [];

// ดึงข้อมูลจากช่องกรอกข้อมูล
function GetBillAddInf() {
  // address
  const FirstN_Bill = document.getElementById("firstName_Cart").value;
  const LastN_Bill = document.getElementById("lastName_Cart").value;
  const Email_Bill = document.getElementById("email_Cart").value;
  const Address_Bill = document.getElementById("address_Cart").value;
  const Address2_Bill = document.getElementById("address2_Cart").value;
  const Country_Bill = document.getElementById("country_Cart").value;
  const State_Bill = document.getElementById("state_Cart").value;
  const Zip_Bill = document.getElementById("zip_Cart").value;

// Payment type (radio)
  const paymentSelected = document.querySelector('input[name="paymentMethod"]:checked');
  const PaymentType_Bill = paymentSelected ? paymentSelected.nextElementSibling.innerText.trim() : "";

  // Payment
  // const PaymentType_Bill = document.getElementById("").value;
  const CartN_Bill = document.getElementById("cc-name_Cart").value;
  const CardNo_Bill = document.getElementById("cc-number_Cart").value;
  const Exp_Bill = document.getElementById("cc-exp_Cart").value;
  const CCV_Bill = document.getElementById("cc-cvv_Cart").value;

  // กับช่องว่าง ต้องกรอกให้ครบ
  if (!FirstN_Bill || !LastN_Bill || !Address_Bill || !Country_Bill || !State_Bill || !Zip_Bill || !CartN_Bill || !CardNo_Bill || !Exp_Bill || !CCV_Bill) {
    alert("กรุณากรอกข้อมูลให้ครบทุกช่อง สำหรับการจ่ายเงิน");
    return;

  }

  // ดึงค่าข้อมูลที่กรอกมา
  const billAddressData = {
    FirstName: FirstN_Bill,
    LastName: LastN_Bill,
    Email: Email_Bill,
    Address: Address_Bill,
    Address2: Address2_Bill,
    Country: Country_Bill,
    State: State_Bill,
    Zip: Zip_Bill,

    PaymentType:PaymentType_Bill,
    CardName:CartN_Bill,
    CardNo:CardNo_Bill,
    CardExp:Exp_Bill,
    CardCCV:CCV_Bill,

    date: new Date().toLocaleString()
  };

  // Array Object >> เพิ่ม Object ลง Array
  billList.push(billAddressData); // ก่อนจะ .push ต้องเป็นตัวเดียวกับที่ประกาศในตอนแรก !!
  localStorage.setItem("billAddress", JSON.stringify(billList));

  // Check
  console.log("Bill Address List",billList);

  // เคลียร์ฟอร์มหลังบันทึก
  document.getElementById("firstName_Cart").value ="";
  document.getElementById("lastName_Cart").value ="";
  document.getElementById("email_Cart").value ="";
  document.getElementById("address_Cart").value ="";
  document.getElementById("address2_Cart").value ="";
  document.getElementById("country_Cart").value ="";
  document.getElementById("state_Cart").value ="";
  document.getElementById("zip_Cart").value ="";

  document.getElementById("cc-name_Cart").value ="";
  document.getElementById("cc-number_Cart").value ="";
  document.getElementById("cc-exp_Cart").value ="";
  document.getElementById("cc-cvv_Cart").value ="";
  // document.getElementById("").value ="";

  alert("บันทึกข้อมูลการชำระเงินเรียบร้อยแล้ว!");
}


