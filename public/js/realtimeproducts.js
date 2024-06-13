const socket = io();
const productsList = document.getElementById("productsList");

document.getElementById("saveProduct").addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const code = document.getElementById("code").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;

    if (title && description && price && thumbnail && code && stock && category) {
        socket.emit("addProduct", {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status: true
        });

        alert("Producto agregado");
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

// Mostrar los productos iniciales
socket.on("productsList", (data) => {
    productsList.innerHTML = data.map((product) => {
        return `<li>${product.title} - ${product.description} - $${product.price} - ${product.stock} - ${product.category} - ${product.code} - ${product.status} - ${product.thumbnail}</li>`;
    }).join('');
});

// Actualizar productos en tiempo real
socket.on("updateProductsList", (data) => {
    const productsListUpdatesContainer = document.getElementById("productsListUpdates");
    const parsedData = JSON.parse(data);
    const productList = Object.entries(parsedData).map(([key, value]) => {
        return `<li>${key}: ${value}</li>`;
    }).join('');
    productsListUpdatesContainer.innerHTML = `<ul>${productList}</ul>`;
});

const saveProductButton = document.getElementById("saveProduct");

saveProductButton.addEventListener("click", (event) => {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const priceInput = document.getElementById("price");
    const thumbnailInput = document.getElementById("thumbnail");
    const codeInput = document.getElementById("code");
    const stockInput = document.getElementById("stock");
    const categoryInput = document.getElementById("category");

    const formData = {
        title: titleInput.value,
        description: descriptionInput.value,
        price: priceInput.value,
        thumbnail: thumbnailInput.value,
        code: codeInput.value,
        stock: stockInput.value,
        category: categoryInput.value,
    };

    socket.emit("formData", formData);

    console.log(formData)
});