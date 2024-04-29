function fetchDataFromAPI() {
    const requestURL = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448";
    fetch(requestURL)
        .then((response) => response.json())
        .then((data) => {
            const productData = data.product;

            document.getElementById("embraceSideboardProduct").src = productData.images[0].src;

            document.querySelector(".product-vendor").textContent = productData.vendor;
            document.querySelector(".product-title").textContent = productData.title;
            document.querySelector(".price").textContent = productData.price + ".00";
            document.querySelector(".compare-at-price").textContent = productData.compare_at_price + ".00";
            document.querySelector(".product-description").innerHTML = productData.description;

            const price = parseFloat(productData.price.replace("$", "").replace(",", ""));
            const compareAtPrice = parseFloat(productData.compare_at_price.replace("$", "").replace(",", ""));
            const percentageOff = ((compareAtPrice - price) / compareAtPrice) * 100;

            const percentageOffElement = document.querySelector(".discount-offered");
            if (!isNaN(percentageOff) && percentageOff > 0) {
                percentageOffElement.textContent = `${percentageOff.toFixed(0)}% Off`;
            } else {
                percentageOffElement.textContent = "No discount";
            }

            const thumbnailsContainer = document.querySelector(".thumbnails");
            thumbnailsContainer.innerHTML = "";
            productData.images.forEach((image) => {
                const img = document.createElement("img");
                img.src = image.src;
                img.alt = "Thumbnail";
                img.classList.add("thumbnail");
                img.addEventListener("click", () => {
                    document.getElementById("embraceSideboardProduct").src = image.src;
                });
                thumbnailsContainer.appendChild(img);
            });

            function handleColorSelection(selectedColorDiv) {
                const allColors = document.querySelectorAll(".color");
                allColors.forEach((color) => {
                    color.classList.remove("selected");
                    color.style.border = "none";
                });
                selectedColorDiv.classList.add("selected");
                selectedColorDiv.style.border = "2px solid black";
            }

            function renderColorOptions() {
                const colorContainer = document.querySelector(".c-container");
                colorContainer.innerHTML = "";
                productData.options[0].values.forEach((color, index) => {
                    const colorDiv = document.createElement("div");
                    const colorName = Object.keys(color)[0];
                    colorDiv.style.backgroundColor = color[colorName];
                    colorDiv.classList.add("color");
                    colorDiv.dataset.color = colorName;

                    colorDiv.addEventListener("click", () =>
                        handleColorSelection(colorDiv, index)
                    );

                    colorContainer.appendChild(colorDiv);

                    // Initially select the first color
                    if (index === 0) {
                        colorDiv.classList.add("selected");
                        colorDiv.style.border = "2px solid black";
                    }
                });
            }

            function renderSizeOptions() {
                const sizeContainer = document.querySelector(".size-selector");
                sizeContainer.innerHTML = "";
                productData.options[1].values.forEach((size, index) => {
                    const sizeDiv = document.createElement("div");
                    sizeDiv.classList.add("size-type-container");

                    const input = document.createElement("input");
                    const label = document.createElement("label");
                    input.type = "radio";
                    input.id = size;
                    input.name = "size";
                    input.value = size;
                    label.htmlFor = size;
                    label.textContent = size;

                    sizeDiv.appendChild(input);
                    sizeDiv.appendChild(label);

                    sizeContainer.appendChild(sizeDiv);

                    // Initially select the first size
                    if (index === 0) {
                        input.checked = true;
                    }
                });
            }

            function updateAddToCart() {
                const selectedColor = document.querySelector(".color.selected");
                const selectedSize = document.querySelector('input[name="size"]:checked');
                const addToCartMessage = document.querySelector(".add-to-cart-message");

                if (selectedColor && selectedSize) {
                    const color = selectedColor.dataset.color;
                    const size = selectedSize.value;

                    const addedProductDetails = document.getElementById(
                        "addedProductDetails"
                    );
                    addedProductDetails.textContent = `Embrace Sideboard with Color ${color}, Size ${size} added to cart`;

                    addedProductDetails.style.background = "#E7F8B7";
                    addedProductDetails.style.color = "#000000";
                    addedProductDetails.style.fontFamily = "Inter";
                    addedProductDetails.style.fontSize = "14px";
                    addedProductDetails.style.fontWeight = "600";
                    addedProductDetails.style.letterSpacing = "0";
                    addedProductDetails.style.textAlign = "center";
                    addedProductDetails.style.marginTop = '10px';

                    addToCartMessage.style.display = "block";
                } else {
                    addToCartMessage.style.display = "none";

                }
            }

            function handleSizeSelection() {
                updateAddToCart();
            }


            const colors = document.querySelectorAll(".color");
            const sizeInputs = document.querySelectorAll('input[name="size"]');
            const addToCartButton = document.querySelector(".add-to-cart-btn");

            colors.forEach((color, index) => {
                color.addEventListener("click", () =>
                    handleColorSelection(color, index)
                );
            });

            sizeInputs.forEach((size) => {
                size.addEventListener("change", handleSizeSelection);
            });

            renderColorOptions();
            renderSizeOptions();
            addToCartButton.addEventListener("click", updateAddToCart);

        })
        .catch((error) => console.error("Error fetching data:", error));
}

fetchDataFromAPI()

function onDecrement() {
    let quantityElement = document.getElementById("productQuantityValue");
    let currentValue = parseInt(quantityElement.textContent);
    if (currentValue > 1) {
        quantityElement.textContent = currentValue - 1;
    }
}

function onIncrement() {
    let quantityElement = document.getElementById("productQuantityValue");
    let currentValue = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentValue + 1;
}
