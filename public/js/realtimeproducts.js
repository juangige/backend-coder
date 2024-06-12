const socket = io();
const productsList = document.getElementById("productsList");

document.getElementById("saveProduct").addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const code = document.getElementById("code").value;
    const stock = document.getElementById("stock").value;

    if (title && description && price && thumbnail && code && stock) {
        socket.emit("productsList", {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status: true
        });

        alert("Producto agregado");
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

socket.on("productsList", (data) => {
    // mostrar los productos
    productsList.innerHTML = data.map((product) => {
        return `<li>${product.title} - ${product.description} - $${product.price} - ${product.stock} - ${product.category} - ${product.code} - ${product.status} - ${product.thumbnail}</li>`;
    }).join('');
});



