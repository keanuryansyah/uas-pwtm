document.addEventListener("DOMContentLoaded", () => {
    // POPUP
    let popupCtn = document.getElementById("mm-popup-ctn-wr");
    let formEdit = document.getElementById("produk-edited-form");
    let formAddWr = document.querySelector('.mmc-r1-row2');

    // ALERT BOX
    let alertBox = document.querySelector(".alert-box-wr");

    let editProduk = (button) => {
        // AMBIL META PRODUK YANG INGIN DI EDIT

        // 1. Image Produk
        let imageProd = button
            .closest(".card-menu")
            .querySelector(".card-menu-row1 img").src;

        // 2. Nama Produk
        let nameProd = button
            .closest(".card-menu")
            .querySelector(".card-menu-row2 h3").innerHTML;

        // 3. Deskripsi Produk
        let deskProd = button
            .closest(".card-menu")
            .querySelector(".card-menu-row3 p").innerHTML;

        // 4. Harga Produk
        let priceProd = button
            .closest(".card-menu")
            .querySelector(".card-menu-row4 span").innerHTML;

        // 5. Ambil ID Produk
        let idProduk = button.getAttribute("data-produk");

        // 6 Ambil Category Produk
        let catProduk = button.closest('.card-menu').getAttribute('data-cat');

        // Jika Product Tidak Mempunyai Image Hapus Icon Delete Image
        if (imageProd.includes("no-image.jpg")) {
            let buttonsCdi = document.querySelectorAll(
                ".change-del-image button"
            );

            buttonsCdi.forEach((btnCdi) => {
                if (btnCdi.getAttribute("data-btn") == "delete-image") {
                    btnCdi.style.display = "none";
                }
            });
        } else {
            let buttonsCdi = document.querySelectorAll(
                ".change-del-image button"
            );

            buttonsCdi.forEach((btnCdi) => {
                if (btnCdi.getAttribute("data-btn") == "delete-image") {
                    btnCdi.style.display = "flex";
                }
            });
        }

        // Simpan Data Yang Belum Di Edit Ke Localstorage
        let currentDataProduk = {
            imageProduk: imageProd,
            namaProduk: nameProd,
            deskripsiProduk: deskProd,
            hargaProduk: priceProd,
            catProduk: catProduk
        };

        localStorage.setItem(
            "currentDataProduk",
            JSON.stringify(currentDataProduk)
        );

        // AMBIL SEMUA INPUT YANG ADA DIDALAM POPUP EDIT

        // 1. Image
        let imagePopup = document.querySelector(".dpc-row1 img");

        // 2. Input Nama Produk
        let namePopup = document.querySelector(".dpc-row2 input");

        // 3. Textarea Deskripsi Produk
        let deskPopup = document.querySelector(".dpc-row3 textarea");

        // 4. Input Harga Produk
        let pricePopup = document.querySelector(".dpc-row4 input");

        // 5 Input Category Produk
        let catPopup = document.querySelector(".dpc-row6 select");
        catPopup.value = catProduk;
        catPopup.dispatchEvent(new Event('change'));


        // ISIKAN SEMUA INPUT YANG ADA DIDALAM POPUP DENGAN META PRODUK YANG INGIN DI EDIT

        // 1. Isi Image Produk
        imagePopup.src = imageProd;

        // 2. Isi Nama Produk
        namePopup.value = nameProd;

        // 3. Isi Deskripsi Produk
        deskPopup.value = deskProd;

        // 4. Isi Harga Produk
        pricePopup.value = priceProd;

        // TAMBAHKAN ID PRODUK KEDALAM CONTENT POPUP
        formEdit.setAttribute("data-produk", idProduk);

        // MUNCULKAN POPUP
        popupCtn.classList.add("show");
    };

    let deleteProduk = (button) => {
        // Ambil Action Button
        let buttonAction = button.getAttribute("data-btn");

        // Ambil ID Produk
        let idProduk = button.getAttribute("data-produk");

        // Konfirmasi Apakah Yakin Ingin Hapus Produk
        let conDel = confirm("Yakin ingin hapus produk?");

        // Jika Yakin
        if (conDel) {
            // Parsing Id Produk Ke Server Untuk Di Olah
            fetch("/menu-management", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content"),
                },
                body: JSON.stringify({
                    actionButton: buttonAction,
                    dataProduk: idProduk,
                }),
            })
                .then((response) => response.text())
                .then((responseData) => {
                    switch (responseData) {
                        case "item-deleted":
                            alertBox.querySelector(".alert-box").innerHTML =
                                "Produk berhasil di hapus!";

                            alertBox.classList.add("show");

                            setTimeout(() => {
                                alertBox.classList.remove("show");
                            }, 1000);

                            setTimeout(() => {
                                window.location.reload();
                            }, 1200);

                            break;
                    }
                });
        }
    };

    let saveEditedProduk = (button) => {
        // Ambil Action Button
        let buttonAction = button.getAttribute("data-btn");

        // Ambil data terbaru
        let imageProd = formEdit.querySelector(".image-product").src;

        let nameProd = formEdit.elements.edit_name.value;

        let deskProd = formEdit.elements.edit_desk.value;

        let priceProd = formEdit.elements.edit_price.value;

        let catProd = formEdit.elements.edit_cat.value;

        // Cek Apakah Ada Data Yang Di Edit
        let oldProdukData = JSON.parse(
            localStorage.getItem("currentDataProduk")
        );

        let dataChecked = false;

        if (nameProd !== oldProdukData.namaProduk) {
            dataChecked = true;
        } else if (deskProd !== oldProdukData.deskripsiProduk) {
            dataChecked = true;
        } else if (priceProd !== oldProdukData.hargaProduk) {
            dataChecked = true;
        } else if (imageProd !== oldProdukData.imageProduk) {
            dataChecked = true;
        } else if (catProd !== oldProdukData.catProduk) {
            dataChecked = true;
        }

        // Jika Ada Data Yang Di edit
        if (dataChecked) {
            // Ini Adalah Data Yang Siap Di Parsing Ke Server Untuk Di Olah
            let dataFromJs = {
                actionButton: buttonAction,
                imageProduk: imageProd,
                namaProduk: nameProd,
                deskProduk: deskProd,
                hargaProduk: priceProd,
                catProduk: catProd,
                idProduk:
                    button.parentElement.parentElement.getAttribute(
                        "data-produk"
                    ),
            };

            fetch("/menu-management", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content"),
                },
                body: JSON.stringify(dataFromJs),
            })
                .then((response) => response.text())
                .then((responseData) => {
                    switch (responseData) {
                        case "item-updated":
                            alertBox.querySelector(".alert-box").innerHTML =
                                "Data berhasil di update!";

                            // Munculkan Alert Box
                            alertBox.classList.add("show");

                            setTimeout(() => {
                                window.location.reload();
                            }, 1200);

                            localStorage.removeItem("currentDataProduk");

                            break;
                        case "name-failed":
                            alertBox.querySelector(".alert-box").innerHTML =
                                "Nama produk minimal 3 karakter!"; // Munculkan Alert Box
                            alertBox.classList.add("show");

                            break;
                        case "desk-failed":
                            alertBox.querySelector(".alert-box").innerHTML =
                                "Deskripsi produk minimal 5 karakter!";
                            // Munculkan Alert Box
                            alertBox.classList.add("show");

                            break;
                        case "price-failed":
                            alertBox.querySelector(".alert-box").innerHTML =
                                "Harga produk minimal 3 karakter!";
                            // Munculkan Alert Box
                            alertBox.classList.add("show");

                            break;
                    }
                });

            // Jika Tidak Ada Data Yang Di Edit
        } else {
            alertBox.querySelector(".alert-box").innerHTML =
                "Silahkan edit data terlebih dahulu!";
            // Munculkan Alert Box
            alertBox.classList.add("show");
        }

        setTimeout(() => {
            alertBox.classList.remove("show");
        }, 1000);
    };

    let discardEditedProduk = () => {
        // Ambil Data Original Produk Didalam Localstorage
        let originalProdukData = JSON.parse(
            localStorage.getItem("currentDataProduk")
        );

        // Ambil Data Didalam Input Edit

        let imageProd = formEdit.querySelector(".image-product").src;

        let nameProd = formEdit.elements.edit_name.value;

        let deskProd = formEdit.elements.edit_desk.value;

        let priceProd = formEdit.elements.edit_price.value;

        // Cek Apakah Ada Data Yang Di Edit
        let dataChecked = false;

        if (nameProd !== originalProdukData.namaProduk) {
            dataChecked = true;
        } else if (deskProd !== originalProdukData.deskripsiProduk) {
            dataChecked = true;
        } else if (priceProd !== originalProdukData.hargaProduk) {
            dataChecked = true;
        } else if (imageProd !== originalProdukData.imageProduk) {
            dataChecked = true;
        }

        // Jika Ada Yang Di Edit
        if (dataChecked) {
            let discardConfirm = confirm(
                "Yakin ingin membatalkan edit data? data yang sudah di edit akan di reset kembali."
            );

            if (discardConfirm) {
                popupCtn.classList.remove("show");
                localStorage.removeItem("currentDataProduk");
            }
        } else {
            popupCtn.classList.remove("show");
            localStorage.removeItem("currentDataProduk");
        }
    };

    let deleteProductImage = (button) => {
        // Ganti Image Product Di Form Edit Product
        button.closest('form').querySelector('.image-product').src = "images/no-image.jpg";
        // formEdit.querySelector(".image-product").src = "images/no-image.jpg";

        // Hilangkan Button Delete Image
        button.style.display = "none";
    };

    let changeProductImage = (imageSelectedF, elImage) => {
        // Ambil Media And Files Box
        mediaFileBox.classList.add("show");

        // Unchecked Image Yang Sudah Di Pilih
        allImagesOnMediaFiles.forEach((allImagesOnMediaUnselected) => {
            allImagesOnMediaUnselected.classList.remove("selected");
        });

        setTimeout(() => {
            imageSelectedF(changeSrc, elImage);
        }, 20);
    };

    let showFormAddProduct = () => {

        if (formAddWr.classList.contains('show')) {
            return;
        }

        formAddWr.style.height = `${formAddWr.scrollHeight}px`;
        setTimeout(() => {
            formAddWr.classList.add('show');
        }, 500)
    }

    let saveNewProduct = (btn) => {
        let addProductForm = btn.closest('#add-product-form');

        // Image Produk
        let imageProduct = addProductForm.querySelector('.image-product').src;

        // Nama Produk
        let nameProduk = addProductForm.querySelector('#input-name').value;

        // Deskripsi Produk
        let deskProduk = addProductForm.querySelector('#input-desk').value;

        // Harga Produk
        let priceProduk = addProductForm.querySelector('#input-price').value;

        // Kategori Produk
        let catProduk = addProductForm.querySelector('#input-category').value;

        let dataNewProduct = {
            actionButton: 'save-new-product',
            imageProduct: imageProduct,
            nameProduk: nameProduk,
            deskProduk: deskProduk,
            priceProduk: priceProduk,
            catProduk: catProduk
        }

        fetch("/menu-management", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute("content"),
            },
            body: JSON.stringify(dataNewProduct),
        })

            .then(response => response.text())
            .then(responseData => {
                console.log(responseData)
                if (responseData == 'success') {
                    alert('Produk berhasil ditambahkan!');
                    setTimeout(() => {
                        window.location.href = '/menu-management';
                    }, 500)
                } else {
                    alert('Pastikan semua input terisi ya!');
                }
            })



    }

    // Ambil Semua Tombol
    let buttons = document.querySelectorAll(".button");

    // Semua Trigger/Tombol Di Halaman menu-management Ada Disini.
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            let buttonClicked = button.getAttribute("data-btn");
            console.log(buttonClicked);

            switch (buttonClicked) {
                case "edit-button":
                    // Jalankan Function editProduk
                    editProduk(button);

                    break;

                case "delete-button":
                    // Jalankan Function deleteProduk
                    deleteProduk(button);

                    break;

                case "save-changes":
                    // Jalankan Function saveEditedProduk
                    saveEditedProduk(button);

                    break;

                case "delete-image":
                    // Jalankan Function deleteProductImage
                    deleteProductImage(button);

                    break;

                case "change-image":
                    // Jalankan Function changeProductImage
                    changeProductImage(
                        imageSelected,
                        formEdit.querySelector(".image-product")
                    );

                    break;

                case "add-product":
                    showFormAddProduct();
                    break;

                case "change-image-on-add-prod":
                    changeProductImage(
                        imageSelected,
                        document.querySelector('#add-product-form .image-product')
                    );
                    break;
                case 'save-add-product':
                    saveNewProduct(button);
                    break;
            }
        });
    });

    let closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
        discardEditedProduk();
    });

    popupCtn.addEventListener("click", (e) => {
        if (e.target == popupCtn) {
            discardEditedProduk();
        }
    });

    // Button untuk menutup form add product
    let closeFormAddProductBtn = document.querySelector('.close-form-add-product');

    closeFormAddProductBtn.addEventListener('click', () => {

        formAddWr.classList.remove('show');
        formAddWr.style.height = 0;
    })

});
