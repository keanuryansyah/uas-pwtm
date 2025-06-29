// FUNGSI-FUNGSI YANG DIPAKAI UNTUK MENANGANGI ADD TO CART.

// Fungsi ambil element dengan class card-menu.
let getParentProductOnCardMenu = (btn) => {
    let rootParent = btn.closest('.card-menu');
    return rootParent;
}

// Sampe sini.

// Fungsi ambil ID dari product.
let getIdProduct = (rootParent) => {
    let idProduct = rootParent.getAttribute('data-product');
    return idProduct;
}

// Sampe sini.

// Fungsi reset button pada card menu.
let resetButtonOnCardMenu = (rootParent, btn) => {
    // Reset tombol pada card menu.
    rootParent.querySelector('.qty-input').innerHTML = '0';
    btn.classList.remove('active');
}

// Sampe sini.

// Fungsi ambil subtotal akhir.
let getLastSubtotal = (priceProductNumber) => {
    // Ambil subtotal harga saat ini.
    let spanSubtotal = document.querySelector('.subtotal-result .last-subtotal');

    // Jumlahkan subtotal harga saat ini dengan harga produk yang baru ditambahkan.
    let newSubtotal = Number(spanSubtotal.innerHTML.replace(/\./g, "")) + priceProductNumber;

    let finalNewSubtotal = newSubtotal.toLocaleString('id-ID');

    spanSubtotal.innerHTML = finalNewSubtotal

}

// Sampe sini.

// Fungsi update localstorage dengan data yang terbaru.
let updateTempCartLocalStorage = (idProduct, qtyProduct, tempCartJson, priceProductNumber) => {
    // Update localstorage

    let newTempCartsString = JSON.parse(tempCartJson);

    newTempCartsString.forEach(newTempCartString => {
        if (newTempCartString.idProduct == idProduct) {

            // Update QTY produk di localstorage.
            newTempCartString.qtyProduct = Number(newTempCartString.qtyProduct) + Number(qtyProduct);

            // Update price produk di localstorage.
            newTempCartString.priceProduct = Number(newTempCartString.priceProduct) + priceProductNumber;

        };
    });

    let newData = [];

    newTempCartsString.forEach(newTempCartString => {
        newData.push(newTempCartString);
    });

    localStorage.setItem('temp-cart', JSON.stringify(newData));

}

// Sampe sini.

// Fungsi cek item yang ada pada cart sudah ada belum di localstorage.
let checkItemOnLocalStorage = (idProduct, qtyProduct, rootParent, priceProductNumber, btn) => {

    // Ambil localstorage yang menjadi tempat penyimpanan sementara produk pada cart.
    let tempCartJson = localStorage.getItem('temp-cart');

    // Pasang variable penanda, apakah product sudah ada dalam localstorage?
    let existingProductIs = false;

    // Jika localstorage ada.
    if (tempCartJson) {

        // Ubah localstorage dari JSON ke String.
        let tempCartsString = JSON.parse(tempCartJson);

        // Cek apakah ada ID produk yang sama didalam localstorage dengan ID produk yang baru saja di tambahkan?
        tempCartsString.forEach(tempCartString => {

            // Jika ada ->
            if (tempCartString.idProduct == idProduct) {
                // Ambil semua produk yang sudah ada di dalam chart.
                let allItemsOnCart = document.querySelectorAll('#cart-content-filled .ccf-row2 .product-ctn');

                // Cocokkan row produk yang ada pada localstorage dengan yang ada di dalam cart.
                allItemsOnCart.forEach(allItemOnCart => {

                    // Jika ada ->
                    if (allItemOnCart.getAttribute('data-product') === idProduct) {
                        // Tambahkan qty pada row produk ini.
                        allItemOnCart.querySelector('.qty-input').innerHTML = Number(allItemOnCart.querySelector('.qty-input').innerHTML) + Number(qtyProduct);

                        // Reset qty produk dan tombol pada card menu.
                        resetButtonOnCardMenu(rootParent, btn);

                        // Ambil subtotal akhir.
                        getLastSubtotal(priceProductNumber);

                        // Update localstorage temp-cart
                        updateTempCartLocalStorage(idProduct, qtyProduct, tempCartJson, priceProductNumber);

                        existingProductIs = true;
                    }
                })

            }
        })


    }

    return existingProductIs;

}

// Sampe sini.

// Sampe sini.