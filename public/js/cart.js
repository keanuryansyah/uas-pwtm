document.addEventListener('DOMContentLoaded', () => {
    let headerSection2 = document.getElementById('header-section-2');
    let body = document.body;

    if (body.getAttribute('class').split('-')[1] !== '' && document.querySelector('.ccf-row2').children.length > 0) {
        document.querySelector('#cart-content-unfilled').classList.remove('show');
        document.querySelector('#cart-content-filled').classList.add('show');
    }

    // Buka cart.
    let openCartButtons = document.querySelectorAll('.cart-icon');
    let cartWrapper = document.querySelector('.cart-wrapper');

    openCartButtons.forEach(openCartButton => {

        openCartButton.addEventListener('click', () => {
            body.style.overflow = 'hidden';
            cartWrapper.classList.add('show');
        });

    });

    // Sampe sini.

    // Tutup cart.
    let closeCartButtons = document.querySelectorAll('.close-cart-wrapper');
    closeCartButtons.forEach(closeCartButton => {
        closeCartButton.addEventListener('click', () => {
            body.style.overflow = 'visible';
            cartWrapper.classList.remove('show');
        })
    })

    cartWrapper.addEventListener('click', (e) => {
        if (e.target == cartWrapper) {
            body.style.overflow = 'visible';
            cartWrapper.classList.remove('show');
        }
    })

    // Sampe sini.

    // Interaksi tombol plus pada card menu.
    let plusButtonOnCardMenus = document.querySelectorAll('.card-menu .plus-item');
    let minButtonOnCardMenus = document.querySelectorAll('.card-menu .min-item');

    plusButtonOnCardMenus.forEach(plusButtonOnCardMenu => {
        plusButtonOnCardMenu.addEventListener('click', () => {
            // ADD QTY
            let qty = plusButtonOnCardMenu.previousElementSibling;
            qty.innerHTML = Number(qty.innerHTML) + 1;

            // BUTTON ADD TO CART ACTIVE
            let addToCartButton = plusButtonOnCardMenu.closest('.card-menu').querySelector('.product-button a');

            addToCartButton.classList.add('active');

        })
    })

    // Sampe sini.

    // Interaksi tombol min pada card menu.
    minButtonOnCardMenus.forEach(minButtonOnCardMenu => {
        minButtonOnCardMenu.addEventListener('click', () => {
            // MIN QTY
            let qty = minButtonOnCardMenu.nextElementSibling;

            if (Number(qty.innerHTML) < 1) {
                return;
            } else if (Number(qty.innerHTML) == 1) {
                let minToCartButton = minButtonOnCardMenu.closest('.card-menu').querySelector('.product-button a');

                minToCartButton.classList.remove('active');

            }

            qty.innerHTML = Number(qty.innerHTML) - 1;
        })
    })

    // Sampe sini.


    // Fungsi add to cart.
    let addToCart = (btn) => {
        let flagAvailItem = false;

        if (!btn.classList.contains('active') && qtyProduct == 0) {
            return;
        }

        let body = document.body;
        let bodyClass = body.getAttribute('class').split('-');
        if (bodyClass[1] === '') {
            window.location.href = '/login';
            return;
        }

        // Ambil header section2 lalu munculkan.
        headerSection2.classList.add('show');

        // Ambil parent tertua dari tombol yang di klik.
        let rootParent = getParentProductOnCardMenu(btn);

        // Ambil jumlah produk.
        let qtyProduct = rootParent.querySelector('.qty-input').innerHTML;

        // Ambil ikon cart pada header section.
        let manyItems = document.querySelectorAll('.many-item');

        manyItems.forEach(manyItem => {
            manyItem.innerHTML = Number(manyItem.innerHTML) + Number(qtyProduct);
        })


        // Ambil ID produk.
        let idProduct = getIdProduct(rootParent);

        // Ambil harga produk.
        let priceProduct = rootParent.querySelector('.product-price').innerHTML.replace(/[^\d.,]/g, '');

        // Jadikan harga produk ke tipe data integer.
        let priceProductNumber = Number(priceProduct.replace(/\./g, "")) * Number(qtyProduct);

        // // Cek apakah item sudah ada di dalam localstorage
        // let checkDataOnLocalStorage = checkItemOnLocalStorage(idProduct, qtyProduct, rootParent, priceProductNumber, btn);

        // if (checkDataOnLocalStorage) {
        //     return;
        // }

        // Ambil fitur image produk.
        let fimProduct = rootParent.querySelector('.product-fim img').src;

        // Ambil nama produk.
        let nameProduct = rootParent.querySelector('.product-name').innerHTML;


        // Ambil konten pembungkus pada cart.
        let cartContents = document.querySelectorAll('.cc');
        cartContents.forEach(cartContent => {
            if (cartContent.getAttribute('id') == 'cart-content-unfilled') {
                cartContent.classList.remove('show');
            } else {
                cartContent.classList.add('show');

                // Ambil parent untuk membungkus list produk yang di tambahkan kedalam cart.
                let cartItemWrapper = cartContent.querySelector('.ccf-row2');

                let productCtns = cartItemWrapper.querySelectorAll('.product-ctn');

                // Cek apakah item sudah ada dalam cart
                productCtns.forEach(productCtn => {
                    if (productCtn.getAttribute('data-product') == idProduct) {
                        let priceEl = productCtn.querySelector('.prod-price-on-cart');
                        let rawText = priceEl.innerText; // contoh: "Rp88.000"

                        // Hapus "Rp" dan titik, lalu ubah ke angka
                        let currentPrice = parseInt(rawText.replace('Rp', '').replace(/\./g, ''));

                        // Tambahkan dengan harga item
                        let newPrice = currentPrice + priceProductNumber;

                        // Format ulang: Rp + format angka ribuan Indonesia
                        priceEl.innerText = 'Rp' + newPrice.toLocaleString('id-ID');

                        let manyEl = productCtn.querySelector('.qty-input');
                        let rawMany = parseInt(manyEl.innerText);
                        let newMany = rawMany + Number(qtyProduct);
                        manyEl.innerText = newMany;

                        flagAvailItem = true;

                    }
                })

                if (flagAvailItem) {
                    // // Dapatkan subtotal.
                    getLastSubtotal(priceProductNumber);

                    // Reset tombol pada card menu.
                    resetButtonOnCardMenu(rootParent, btn);

                    let tempCart = {
                        idProduct: idProduct,
                        fimProduct: fimProduct,
                        nameProduct: nameProduct,
                        priceProduct: priceProductNumber,
                        qtyProduct: qtyProduct
                    };

                    fetch('/add-to-cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute('content')
                        },
                        body: JSON.stringify(tempCart)
                    })
                    // .then(response => response.text())
                    // .then(data => {
                    //     if (data === 'success') {
                    //         alert('sukses!');
                    //     } else {
                    //         console.warn('Respons tidak dikenali:', data);
                    //     }
                    // })
                    // .catch(error => {
                    //     console.error('Gagal simpan ke temporary_orders:', error);
                    // });

                    return;
                }

                // DIV class product-ctn
                let makeProductCtn = document.createElement('div');
                makeProductCtn.classList.add('product-ctn');
                makeProductCtn.setAttribute('data-product', idProduct);

                // DIV class pc-col1
                let makePcCol1 = document.createElement('div');
                makePcCol1.classList.add('pc-col1');

                // IMG fim product
                let makeImgFim = document.createElement('img');
                makeImgFim.src = fimProduct;

                makePcCol1.appendChild(makeImgFim);

                // DIV class pc-col2
                let makePcCol2 = document.createElement('div');
                makePcCol2.classList.add('pc-col2');

                // DIV class pc-col2-row1
                let makePcCol2Row1 = document.createElement('div');
                makePcCol2Row1.classList.add('pc-col2-row1');

                // SPAN class prod-name-on-cart
                let makeSpanProdName = document.createElement('span')
                makeSpanProdName.classList.add('prod-name-on-cart');
                makeSpanProdName.innerHTML = nameProduct;

                // SPAN class prod-price-on-cart
                let makeSpanProdPrice = document.createElement('span')
                makeSpanProdPrice.classList.add('prod-price-on-cart');
                makeSpanProdPrice.innerHTML = 'Rp' + priceProductNumber.toLocaleString('id-ID');

                makePcCol2Row1.append(makeSpanProdName, makeSpanProdPrice);

                // DIV class pc-col2-row2
                let makePcCol2Row2 = document.createElement('div');
                makePcCol2Row2.classList.add('pc-col2-row2');

                // DIV class product-qty
                let makeProductQty = document.createElement('div');
                makeProductQty.classList.add('product-qty');

                // BUTTON class plus-item
                let makeButtonPlusItem = document.createElement('button');
                makeButtonPlusItem.type = 'button';
                makeButtonPlusItem.classList.add('plus-item');
                makeButtonPlusItem.innerHTML = '+';
                makeButtonPlusItem.setAttribute('ori-price', Number(priceProduct.replace(/\./g, "")))

                // SPAN class qty-input
                let makeQtyInput = document.createElement('span');
                makeQtyInput.classList.add('qty-input');
                makeQtyInput.innerHTML = qtyProduct;

                // BUTTON class min-item
                let makeButtonMinItem = document.createElement('button');
                makeButtonMinItem.type = 'button';
                makeButtonMinItem.classList.add('min-item');
                makeButtonMinItem.innerHTML = '-';
                makeButtonMinItem.setAttribute('ori-price', Number(priceProduct.replace(/\./g, "")));

                makeProductQty.append(makeButtonMinItem, makeQtyInput, makeButtonPlusItem);

                makePcCol2Row2.appendChild(makeProductQty);

                makePcCol2.append(makePcCol2Row1, makePcCol2Row2);

                // DIV class pc-col3
                let makePcCol3 = document.createElement('div');
                makePcCol3.classList.add('pc-col3');
                makePcCol3.setAttribute('product-price', priceProductNumber)

                // i for trash icon
                let trashIcon = document.createElement('i')
                trashIcon.setAttribute('data-feather', 'trash-2');

                makePcCol3.appendChild(trashIcon);

                makeProductCtn.append(makePcCol1, makePcCol2, makePcCol3);

                cartItemWrapper.appendChild(makeProductCtn);
                feather.replace();

                // // Dapatkan subtotal.
                getLastSubtotal(priceProductNumber);

                // Reset tombol pada card menu.
                resetButtonOnCardMenu(rootParent, btn);

                // // Cek apakah localstorage temp-cart sudah ada?
                // if (localStorage.getItem('temp-cart')) {
                //     let parseTempCart = JSON.parse(localStorage.getItem('temp-cart'));

                //     parseTempCart.push({
                //         idProduct: idProduct,
                //         fimProduct: fimProduct,
                //         nameProduct: nameProduct,
                //         priceProduct: priceProductNumber,
                //         qtyProduct: qtyProduct
                //     });

                //     localStorage.setItem('temp-cart', JSON.stringify(parseTempCart));

                //     return;

                // }

                // CREATE OBJECT TEMPORARY CART
                let tempCart = {
                    idProduct: idProduct,
                    fimProduct: fimProduct,
                    nameProduct: nameProduct,
                    priceProduct: priceProductNumber,
                    qtyProduct: qtyProduct
                };

                fetch('/add-to-cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content')
                    },
                    body: JSON.stringify(tempCart)
                })
                // .then(response => response.text())
                // .then(data => {
                //     if (data === 'success') {
                //         alert('sukses!');
                //     } else {
                //         console.warn('Respons tidak dikenali:', data);
                //     }
                // })
                // .catch(error => {
                //     console.error('Gagal simpan ke temporary_orders:', error);
                // });



            }


        })



    }

    // Sampe sini.



    // Eksekusi fungsi add to cart.
    let productButtons = document.querySelectorAll('.product-button a');
    productButtons.forEach(productButton => {
        productButton.addEventListener('click', (e) => {
            e.preventDefault();

            addToCart(productButton);

        })
    })

    // Sampe sini.

    // Tambah item qty pada cart.
    let plusButtonOnCartItems = document.querySelector('.ccf-row2');
    plusButtonOnCartItems.addEventListener('click', (e) => {
        if (e.target.matches('.plus-item')) {
            // Tambahkan qty item di cart
            e.target.previousElementSibling.innerHTML = parseInt(e.target.previousElementSibling.innerHTML) + 1;

            // Ambil harga original
            let oriPrice = e.target.getAttribute('ori-price');
            let oriPriceToNumber = parseInt(oriPrice)

            // Ambil harga yang tampil di cart sekarang
            let displayPriceEl = e.target.closest('.pc-col2').querySelector('.prod-price-on-cart');
            let displayPrice = parseInt(displayPriceEl.innerText.replace('Rp', '').replace(/\./g, ''));
            let newDisplayPrice = displayPrice + oriPriceToNumber;
            displayPriceEl.innerText = 'Rp' + newDisplayPrice.toLocaleString('id-ID');

            getLastSubtotal(oriPriceToNumber);

            fetch('/update-price-on-cart', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content"),
                },
                body: JSON.stringify({
                    action: 'plus',
                    oriPrice: oriPriceToNumber,
                    idProduct: e.target.closest('.product-ctn').getAttribute('data-product')
                }),
            })

            let manyItemOnHeaders = document.querySelectorAll('.many-item');
            manyItemOnHeaders.forEach(manyItemOnHeader => {
                manyItemOnHeader.innerText = Number(manyItemOnHeader.innerText) + 1;
            })

            // .then(response => response.text())
            // .then(responseData => {
            //     if (responseData == 'success') {
            //         alert('sukses');
            //     }
            // });




        }
    })

    // Kurangi item qty pada cart.
    let minButtonOnCartItems = document.querySelector('.ccf-row2');
    minButtonOnCartItems.addEventListener('click', (e) => {
        if (e.target.matches('.min-item')) {

            if (Number(e.target.nextElementSibling.innerHTML) == 1) {
                fetch('/update-price-on-cart', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content"),
                    },
                    body: JSON.stringify({
                        action: 'delete',
                        idProduct: e.target.closest('.product-ctn').getAttribute('data-product')
                    }),
                })
                    .then(response => response.text())
                    .then(responseData => {
                        if (responseData == 'success') {
                            e.target.closest('.product-ctn').style.transform = 'translateX(-200%)';

                            setTimeout(() => {
                                e.target.closest('.product-ctn').remove();
                            }, 200)

                            setTimeout(() => {
                                if (document.querySelector('.ccf-row2').children.length == 0) {
                                    document.querySelector('#cart-content-unfilled').classList.add('show');
                                    document.querySelector('#cart-content-filled').classList.remove('show');
                                }
                            }, 500)

                        }
                    })

                // Ambil harga original
                let oriPrice = e.target.getAttribute('ori-price');
                let oriPriceToNumber = parseInt(oriPrice)


                let lastSubtotal = document.querySelector('.last-subtotal');
                let lastSubtotalToNumb = Number(lastSubtotal.innerHTML.replace(/\./g, ""))

                let finalSubtotal = lastSubtotalToNumb - oriPriceToNumber;

                let finalNewSubtotal = finalSubtotal.toLocaleString('id-ID');

                lastSubtotal.innerText = finalNewSubtotal;

                let manyItemOnHeaders = document.querySelectorAll('.many-item');
                manyItemOnHeaders.forEach(manyItemOnHeader => {
                    manyItemOnHeader.innerText = Number(manyItemOnHeader.innerText) - 1;
                })

                e.target.closest('.product-ctn').querySelector('.pc-col3').setAttribute('product-price', Number(e.target.closest('.product-ctn').querySelector('.pc-col3').innerText) - oriPriceToNumber);

                return;
            }

            // Tambahkan qty item di cart
            e.target.nextElementSibling.innerHTML = parseInt(e.target.nextElementSibling.innerHTML) - 1;

            // Ambil harga original
            let oriPrice = e.target.getAttribute('ori-price');
            let oriPriceToNumber = parseInt(oriPrice)

            // Ambil harga yang tampil di cart sekarang
            let displayPriceEl = e.target.closest('.pc-col2').querySelector('.prod-price-on-cart');
            let displayPrice = parseInt(displayPriceEl.innerText.replace('Rp', '').replace(/\./g, ''));
            let newDisplayPrice = displayPrice - oriPriceToNumber;
            displayPriceEl.innerText = 'Rp' + newDisplayPrice.toLocaleString('id-ID');

            let lastSubtotal = document.querySelector('.last-subtotal');
            let lastSubtotalToNumb = Number(lastSubtotal.innerHTML.replace(/\./g, ""))

            let finalSubtotal = lastSubtotalToNumb - oriPriceToNumber;

            let finalNewSubtotal = finalSubtotal.toLocaleString('id-ID');

            lastSubtotal.innerText = finalNewSubtotal;

            fetch('/update-price-on-cart', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content"),
                },
                body: JSON.stringify({
                    action: 'min',
                    oriPrice: oriPriceToNumber,
                    idProduct: e.target.closest('.product-ctn').getAttribute('data-product')
                }),
            })

            let manyItemOnHeaders = document.querySelectorAll('.many-item');
            manyItemOnHeaders.forEach(manyItemOnHeader => {
                manyItemOnHeader.innerText = Number(manyItemOnHeader.innerText) - 1;
            })

            e.target.closest('.product-ctn').querySelector('.pc-col3').setAttribute('product-price', Number(e.target.closest('.product-ctn').querySelector('.pc-col3').getAttribute('product-price')) - oriPriceToNumber);

        }
    })

    // Delete item pada cart
    let deleteButtonOnCartItems = document.querySelector('.ccf-row2');
    deleteButtonOnCartItems.addEventListener('click', (e) => {
        if (e.target.matches('.pc-col3')) {
            let productCtn = e.target.closest('.product-ctn');

            let confDel = confirm('Yakin ingin hapus item ini dari keranjang broooo?');

            if (confDel) {
                fetch('/update-price-on-cart', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content"),
                    },
                    body: JSON.stringify({
                        action: 'delete',
                        idProduct: e.target.closest('.product-ctn').getAttribute('data-product')
                    }),

                })
                    .then(response => response.text())
                    .then(responseData => {
                        if (responseData == 'success') {
                            productCtn.style.transform = 'translateX(-200%)';
                            setTimeout(() => {
                                productCtn.remove();
                            }, 200)
                            setTimeout(() => {
                                if (document.querySelector('.ccf-row2').children.length == 0) {
                                    document.querySelector('#cart-content-unfilled').classList.add('show');
                                    document.querySelector('#cart-content-filled').classList.remove('show');
                                }
                            }, 400)
                        }
                    })

                let productPrice = Number(e.target.getAttribute('product-price'));

                let lastSubtotal = document.querySelector('.last-subtotal');
                let lastSubtotalToNumb = Number(lastSubtotal.innerHTML.replace(/\./g, ""))

                let finalSubtotal = lastSubtotalToNumb - productPrice;

                let finalNewSubtotal = finalSubtotal.toLocaleString('id-ID');

                lastSubtotal.innerText = finalNewSubtotal;

                let manyItemOnHeaders = document.querySelectorAll('.many-item');
                manyItemOnHeaders.forEach(manyItemOnHeader => {
                    manyItemOnHeader.innerText = Number(manyItemOnHeader.innerText) - Number(e.target.closest('.product-ctn').querySelector('.qty-input').innerText);
                })
            }

        }
    })

    // Checkout button di klik
    let checkoutButton = document.querySelector('#checkout-btn');
    checkoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        fetch('/get-subtotal', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute("content"),
            },
            body: JSON.stringify({
                action: 'get-subtotal'
            })

        })
            .then(response => response.text())
            .then(responseData => {
                let subtotal = document.querySelector('#ppc-col1 span:nth-child(2)');

                // Ubah string ke number
                let subtotalFromServer = Number(responseData);

                // Format angka dengan locale Indonesia
                let finalSubtotal = subtotalFromServer.toLocaleString('id-ID');

                // Tampilkan ke dalam elemen
                subtotal.innerText = "Rp" + finalSubtotal;

                // Tampilkan popup
                let popupPayment = document.querySelector('#popup-payment');
                popupPayment.classList.add('show');
            });

    })

    let tr = false;
    let ppcMets = document.querySelectorAll('.ppc-met');
    ppcMets.forEach(ppcMet => {
        ppcMet.addEventListener('click', () => {
            ppcMets.forEach(ppcM => {
                ppcM.classList.remove('selected');
            })
            ppcMet.classList.add('selected');
            tr = true;
        })
    })


    // Button send order di klik
    let buttonOnPayments = document.querySelectorAll('#ppc-col2-col2 a');
    buttonOnPayments.forEach(buttonOnPayment => {
        buttonOnPayment.addEventListener('click', (e) => {
            e.preventDefault();
            let whatButton = buttonOnPayment.getAttribute('data-btn');
            switch (whatButton) {
                case 'cancel':
                    fetch('/send-order', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRF-TOKEN": document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute("content"),
                        },
                        body: JSON.stringify({
                            action: 'cancel' // berbeda dengan 'send'
                        }),
                    })
                        .then(response => response.text())
                        .then(responseData => {
                            if (responseData === 'success') {
                                // Tutup popup setelah berhasil
                                let popupPayment = document.querySelector('#popup-payment');
                                popupPayment.classList.remove('show');
                            } else {
                                alert("Gagal menyimpan order.");
                            }
                        });
                    break;
                case 'send':
                    if (tr) {
                        fetch('/send-order', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "X-CSRF-TOKEN": document
                                    .querySelector('meta[name="csrf-token"]')
                                    ?.getAttribute("content"),
                            },
                            body: JSON.stringify({
                                action: 'send'
                            }),
                        })
                            .then(response => response.text())
                            .then(responseData => {
                                if (responseData === 'success') {
                                    alert('Pesanan berhasil dikirim!');
                                    setTimeout(() => {
                                        window.location.href = '/';
                                    }, 1000)

                                } else {
                                    alert('Gagal mengirim pesanan.');
                                }
                            });

                    } else {
                        alert('Silahkan pilih metode pembayaran!');
                    }

                    break;
            }
        })
    })


});

