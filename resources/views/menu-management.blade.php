@push('styles')
<link rel="stylesheet" href="{{asset('css/side-dashboard.css')}}">

<link rel="stylesheet" href="{{asset('css/menu-management.css')}}">

@endpush

<x-side-dashboard></x-side-dashboard>
<x-layout title="Menu Management">
    <section id="menu-management" class="section">
        <div class="alert-box-wr">
            <div class="alert-box">
                test
            </div>
        </div>
        <div id="mm-popup-ctn-wr" class="popup-ctn-wr">
            <div class="dashboard-popup-ctn">
                <div class="close-button red-btn">
                    <span>X</span>
                </div>
                <form action="/menu-management" method="post" id="produk-edited-form">
                    @csrf

                    <div class="dpc-row1 dpc">
                        <img class="image-product" src="{{asset('images/nasigoreng.jpg')}}" alt="">
                        <div class="change-del-image">
                            <button type="button" class="cdi-col1 cdi button" data-btn="change-image">
                                <i class="fa-solid fa-arrows-rotate change-icon" title="Change Image"></i>
                            </button>
                            <button type="button" class="cdi-col2 cdi button" data-btn="delete-image">
                                <i class="fa-solid fa-trash-can delete-icon" title="Delete Image"></i>
                            </button>
                            <input type="file" hidden id="upload-image">
                        </div>
                    </div>
                    <div class="dpc-row2 dpc">
                        <label for="edit-name">
                            Edit name:
                        </label>
                        <input type="text" name="edit_name" id="edit-name" class="no-outline" autofocus>
                    </div>
                    <div class="dpc-row3 dpc">
                        <label for="edit-desk">
                            Edit deskripsi:
                        </label>
                        <textarea name="edit_desk" id="edit-desk" class="no-outline"></textarea>
                    </div>
                    <div class="dpc-row4 dpc">
                        <label for="edit-price">
                            Edit price:
                        </label>
                        <input type="text" name="edit_price" id="edit-price" class=" no-outline">
                    </div>
                    <div class="dpc-row6 dpc">
                        <label for="edit-cat">Edit category:</label>
                        <select name="edit_cat" id="edit-cat">
                            @foreach($categories as $category)
                            <option value="{{$category->id}}">{{$category->name}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="dpc-row5 dpc">
                        <button class="button green-btn" type="button" data-btn="save-changes">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="container">
            <div id="menu-management-ctn">


                <div id="mmc-col2-wr" class="mmc after-side">

                    <div class="menu-management-ctn-row1">
                        <div class="mmc-r1-row1">
                            <button type="submit" class="mmc-col1 mmcc button green-btn" data-btn="add-product">
                                Add Product
                            </button>
                        </div>
                        <div class="mmc-r1-row2">
                            <div class="close-form-add-product">
                                <span>X</span>
                            </div>
                            <form action="/menu-management" method="post" id="add-product-form">
                                <div id="mmc-r1-r2-row1" class="mmc-rrrf">
                                    <img class="image-product" src="{{asset('images/no-image.jpg')}}" alt="">
                                    <div class="change-del-image">
                                        <button type="button" class="cdi-col1 cdi button" data-btn="change-image-on-add-prod">
                                            <i class="fa-solid fa-arrows-rotate change-icon" title="Change Image"></i>
                                        </button>
                                        <button type="button" class="cdi-col2 cdi button" data-btn="delete-image" style="display: none;">
                                            <i class="fa-solid fa-trash-can delete-icon" title="Delete Image"></i>
                                        </button>
                                        <input type="file" hidden id="upload-image">
                                    </div>
                                </div>
                                <div id="mmc-r1-r2-row2" class="mmc-rrrf">
                                    <label for="input-name">Product Name:</label>
                                    <input type="text" id="input-name" name="add-product-name" class="no-outline with-border">
                                </div>
                                <div id="mmc-r1-r2-row3" class="mmc-rrrf">
                                    <label for="input-desk">Product Desc:</label>
                                    <textarea name="add-product-desk" id="input-desk" name="add-product-desk" class="no-outline with-border"></textarea>
                                </div>
                                <div id="mmc-r1-r2-row4" class="mmc-rrrf">
                                    <label for="input-price">Product Price:</label>
                                    <div class="price-div">
                                        <span>Rp</span>
                                        <input type="text" id="input-price" name="add-product-price" class="no-outline">
                                    </div>
                                </div>
                                <div id="mmc-r1-r2-row5" class="mmc-rrrf">
                                    <label for="input-price">Product Category:</label>
                                    <select name="add-product-category" id="input-category">
                                        @foreach($categories as $category)
                                        <option value="{{$category->id}}">{{$category->name}}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div id="mmc-r1-r2-row6" class="mmc-rrrf">
                                    <button type="button" id="save-product-btn" class="button green-btn" data-btn="save-add-product">Save Product</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="menu-management-ctn-row2">
                        @forelse($posts as $post)
                        <div id="menu{{$post->id}}" class="card-menu" data-cat="{{$post->Category->id}}" data-produk="{{$post->id}}">
                            <div class="card-menu-row1">
                                <img class="image-product" src="{{ asset($post->image_prod) }}" alt="">
                            </div>
                            <div class="card-menu-row2">
                                <h3>{{ $post->name_prod }}</h3>
                            </div>
                            <div class="card-menu-row3">
                                <p>{{ $post->desk_prod }}</p>
                            </div>
                            <div class="card-menu-row4 price-prod">
                                <p>Rp</p>
                                <span>{{ $post->harga_prod }}</span>
                            </div>
                            <div class="card-menu-row5">
                                <button type="button" id="button-menu-{{ $post->id }}" class="edit-button button green-btn" data-btn="edit-button" data-produk="{{ $post->id }}">
                                    Edit?
                                </button>
                                <button type="button" data-btn="delete-button" id="button-menu-{{ $post->id }}" class="delete-button button red-btn" data-produk="{{ $post->id }}">
                                    Delete?
                                </button>
                            </div>
                        </div>
                        @empty
                        <div class="no-product-message">
                            Tidak ada produk tersedia.
                        </div>
                        @endforelse
                    </div>


                </div>
            </div>
        </div>
    </section>

    @push('scripts')
    <script src="{{asset('js/menu-management.js')}}"></script>
    @endpush

</x-layout>