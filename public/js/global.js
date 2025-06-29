// HEADER
// HEADER FIXED
let headerSection2 = document.getElementById('header-section-2');
let currentScrolled = 0; // Pastikan nilai awal adalah angka
let reqAnFrame = false; // Flag untuk memastikan hanya satu requestAnimationFrame aktif

const handleScroll = () => {
    let windowScrolled = window.scrollY;

    // Cek apakah sudah melewati batas scroll tertentu
    if (windowScrolled > 90) {
        if (windowScrolled < currentScrolled) {
            if (!headerSection2.classList.contains('show')) {
                headerSection2.classList.add('show');
            }
        } else {
            if (headerSection2.classList.contains('show')) {
                headerSection2.classList.remove('show');
            }
        }
    } else {
        if (headerSection2.classList.contains('show')) {
            headerSection2.classList.remove('show');
        }
    }

    currentScrolled = windowScrolled;
    reqAnFrame = false; // Reset flag setelah fungsi selesai dieksekusi
};

window.addEventListener('scroll', () => {
    if (!reqAnFrame) {
        reqAnFrame = true;
        requestAnimationFrame(handleScroll); // Optimasi performa dengan requestAnimationFrame
    }
});

// HEADER END


// Media File Box
let mediaFileBox = document.querySelector(".media-files-box");

// Tab Buttons For Tab Media And Files
let tabButtons = document.querySelectorAll(".mfc-row1-wr button");

// Tab Contents
let tabContents = document.querySelectorAll(".mfc-row2");

// Image Content
let allImagesOnMediaFiles = document.querySelectorAll("#mfc-row2-full-images .mfc");

let allImagesOnMediaFilesNew = document.querySelector("#mfc-row2-full-images");

let openTabCtn = (tabButton) => {
    // Ambil button action
    let buttonAction = tabButton.getAttribute("data-btn");

    tabContents.forEach((tabContent) => {
        // Ambil Content Yang Sesuai Dengan Button Yang Di Click
        let tabContentSelected = tabContent.getAttribute("data-ctn");

        if (buttonAction === tabContentSelected) {
            tabContent.classList.add("selected");
        } else {
            tabContent.classList.remove("selected");
        }
    });
};

// MEDIA AND FILES
tabButtons.forEach((tabButton) => {
    tabButton.addEventListener("click", () => {
        openTabCtn(tabButton);
    });
});

// Close button di klik tutup upload file
let closeButtonMediaFiles = document.querySelector(".close-button-media-files");
closeButtonMediaFiles.addEventListener("click", () => {
    // Ambil media files modal
    mediaFileBox.classList.remove("show");

    // Unchecked Image Yang Sudah Di Pilih
    allImagesOnMediaFiles.forEach((allImagesOnMediaUnselected) => {
        allImagesOnMediaUnselected.classList.remove("selected");
    });
});

// UPLOAD IMAGE ON MEDIA FILES
let uploadImageInput = document.querySelector('#upload-image');

uploadImageInput.addEventListener('change', (e) => {
    e.preventDefault(); // cegah reload

    setTimeout(() => {

        let files = uploadImageInput.files;
        if (files.length === 0) return;

        let formData = new FormData();
        formData.append('image_prod', files[0]);

        fetch('/upload', {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    ?.getAttribute("content"),
            },
            body: formData
        })
            .then(response => response.text())
            .then(responseData => {
                let responseDataObj = JSON.parse(responseData);
                // JIKA SUKSES UPLOAD
                if (responseDataObj.status === 'success') {
                    document.querySelector('#mfc-row2-full-images').classList.add('selected');
                    document.querySelector('#mfc-row2-upload').classList.remove('selected');

                    // Buat Div Image Di #mfc-row2-full-images
                    let mfc = document.createElement('div');
                    mfc.classList.add('mfc');
                    let mfcImg = document.createElement('img');
                    mfcImg.classList.add('image-product');
                    mfcImg.src = 'https://food.test/' + responseDataObj.file_path;
                    mfc.appendChild(mfcImg);
                    let parentMfc = document.querySelector('#mfc-row2-full-images');
                    parentMfc.insertBefore(mfc, parentMfc.firstChild);

                    uploadImageInput.value = '';
                }
            })
            .catch(error => {
                alert('Tidak bisa mengupload file ini!');
            });
    }, 1000);
});


mediaFileBox.addEventListener("click", (e) => {
    if (e.target === mediaFileBox) {
        mediaFileBox.classList.remove("show");

        // Unchecked Image Yang Sudah Di Pilih
        allImagesOnMediaFiles.forEach((allImagesOnMediaUnselected) => {
            allImagesOnMediaUnselected.classList.remove("selected");
        });
    }
});

// Ketika User Klik Salah Satu Image Yang Ada Didalam Media And Files Box

let changeSrc = (src, elImage) => {

    // Tutup Media File Box
    mediaFileBox.classList.remove('show');

    // Ganti Image Di Form Edit
    elImage.src = src;

    elImage.closest('form').querySelector('.cdi-col2').style.display = 'flex';
}

let imageSelected = (changeSrc, elImage) => {
    allImagesOnMediaFilesNew.addEventListener('click', (e) => {
        if (e.target.closest('.mfc')) {
            allImagesOnMediaFiles.forEach((allImagesOnMediaUnselected) => {
                allImagesOnMediaUnselected.classList.remove("selected");
            });
            e.target.closest('.mfc').classList.add('selected');

            let imageSrcSelected = e.target.closest('.mfc').querySelector('.image-product').src;

            changeSrc(imageSrcSelected, elImage);
        }
    })
};


let dropZone = document.querySelector('#mfc-row2-upload');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    console.log('hello')
})