import readline from "readline/promises";
import { stdin, stdout } from "process";
import { readFile, writeFile } from "fs/promises";

// Database using file starts
const FILE = "product.json";

const getCart = async () => {
  const data = await readFile(FILE, "utf-8");
  return JSON.parse(data);
};

const saveCart = async (cart) => {
  await writeFile(FILE, JSON.stringify(cart, null, 2));
};

const addToCart = async (product) => {
  const cart = await getCart();

  const isFoundInCart = cart.find((item) => item.id === product.id);

  if (isFoundInCart) {
    isFoundInCart.qty += 1;
  } else {
    cart.push(product);
    console.log(`${product.name} added to cart`);
  }

  await saveCart(cart);
};

const displayCart = async () => {
  const cart = await getCart();

  if (cart.length === 0) {
    console.log("🛒 Cart is empty");
    return;
  }

  console.table(cart);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  console.log(`Total payable amount Rs. ${total}`);
};

const removeProduct = async (pid)=>
{
  const cart = await getCart();
  let x = cart.length;
  const newProducts = cart.filter((item) => item.id !== pid);
  let y = newProducts.length;
  if(x>y)
  {
    await saveCart(newProducts);
    console.log("product deleted")
  }
  else 
  {
    console.log("product not found")
  }
}

const updateProductQuantity = async (pid1, option = "-") => {
const cart = await getCart();
const product = cart.find((item) => item.id === pid1);
if (product) {
    if (option === "+") {
        product.qty += 1;
    } else if (option === "-") {
        product.qty -= 1;
        if (product.qty <= 0) {
            await removeProduct(pid1);
            return;
        }
    }
    await saveCart(cart);
    console.log(`Quantity updated for ${product.name}`);
} else {
    console.log("Product not found in cart");
}
}

const main = async () => {
  let choice;
  const cin = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  do {
    console.log("\nWelcome to Amazon Shopping 🛒");
    console.log("1. Show Cart");
    console.log("2. Add Product");
    console.log("3. Remove Product");
    console.log("4. Update Quantity");
    console.log("5. Checkout");

    choice = await cin.question("Enter your choice: ");

    switch (Number(choice)) {
      case 1:
        await displayCart();
        break;

      case 2:
        const item = await cin.question("Enter id,name,price,qty: ");
        const [id,name,price,qty] = item.split(',').map((p) => p.trim());

        await addToCart({
            id:Number(id),
            name,
            price: Number(price),
            qty: Number(qty),
        })
        break;

      case 3:
        console.log("Remove Product");
        const pid = await cin.question("Enter product ID to remove: ");
        await removeProduct(Number(pid));
        break;

      case 4:
        console.log("Update Quantity");
        const pid1 = await cin.question("Enter product ID to update quantity: ");
        const option = await cin.question("Enter '+' to increase or '-' to decrease quantity: ");
        await updateProductQuantity(Number(pid1), option);
        break;

      case 5:
        console.log("Checkout");
        break;

      default:
        console.log("Invalid Choice! Try again  ⚔️");
    }
  } while (Number(choice) !== 5);

  cin.close();
};

main();