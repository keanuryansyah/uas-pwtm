@push('styles')
<link rel="stylesheet" href="{{asset('css/home.css')}}">
@endpush

@php
$manyItem = 0;
$subtotal = 0;
@endphp

@foreach($carts as $c)
@php
$manyItem += $c->qty;
@endphp
@endforeach

@php
$subtotal = 0;
foreach ($carts as $cart) {
$subtotal += $cart->price;
}
@endphp



<x-layout title="Home">
    <header id="header-section" class="section">
        <div class="container">
            <div class="content-wrapper">
                <div id="header-content">
                    <div id="header-content-col1" class="hecon">
                        <a class="header-logo" href="/">DeliciousShop</a>
                    </div>
                    <div id="header-content-col3" class="hecon">
                        @auth
                        <form action="/logout" method="post">
                            @csrf
                            <button type="submit" class="global-btn white-btn" style="font-weight: bold; cursor: pointer;">Logout</button>
                        </form>
                        @if(Auth::user()->role === 'admin')
                        <a href="/dashboard" class="global-btn red-btn" style="color: #ffffff;">Admin Dashboard</a>
                        @endif
                        @else
                        <a href="/login" class="global-btn white-btn">Login</a>
                        @endauth
                        <div class="cart-icon">
                            <i data-feather="shopping-bag"></i>
                            <div class="many-item">
                                {{$manyItem}}
                            </div>
                        </div>
                    </div>
                    <div id="header-content-col4" class="hecon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <header id="header-section-2" class="section">
        <div class="container">
            <div class="content-wrapper">
                <div id="header-content">
                    <div id="header-content-col1" class="hecon">
                        <a class="header-logo" href="/">DeliciousShop</a>
                    </div>
                    <div id="header-content-col3" class="hecon">
                        @auth
                        <form action="/logout" method="post">
                            @csrf
                            <button type="submit" class="global-btn white-btn" style="font-weight: bold; cursor: pointer;">Logout</button>
                        </form>
                        @if(Auth::user()->role === 'admin')
                        <a href="/dashboard" class="global-btn red-btn" style="color: #ffffff;">Admin Dashboard</a>
                        @endif
                        @else
                        <a href="/login" class="global-btn white-btn">Login</a>
                        @endauth
                        <div class="cart-icon">
                            <i data-feather="shopping-bag"></i>
                            <div class="many-item">
                                {{$manyItem}}
                            </div>
                        </div>
                    </div>
                    <div id="header-content-col4" class="hecon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div class="cart-wrapper">
        <div class="cart-content-wr">
            <div id="cart-content-unfilled" class="cc show">
                <i data-feather="shopping-bag"></i>
                <span>empty cart</span>
                <div class="close-cart-wrapper">
                    <span>X</span>
                </div>
            </div>
            <div id="cart-content-filled" class="cc">
                <div class="ccf-row1">
                    <h2>cart</h2>
                    <div class="close-cart-wrapper">
                        <span>X</span>
                    </div>
                </div>
                <div class="ccf-row2">
                    <!-- CART ITEM IN HERE -->
                    @foreach($carts as $cart)
                    <div class="product-ctn" data-product="{{ $cart->product_id }}">
                        <div class="pc-col1">
                            <img src="{{ $cart->product->image_prod }}" alt="">
                        </div>
                        <div class="pc-col2">
                            <div class="pc-col2-row1">
                                <span class="prod-name-on-cart">{{ $cart->product->name_prod }}</span>
                                <span class="prod-price-on-cart">Rp{{ number_format($cart->price, 0, ',', '.') }}</span>
                            </div>
                            <div class="pc-col2-row2">
                                <div class="product-qty">
                                    <button type="button" class="min-item" ori-price="{{$cart->product->harga_prod}}">-</button>
                                    <span class="qty-input">{{ $cart->qty }}</span>
                                    <button type="button" class="plus-item" ori-price="{{$cart->product->harga_prod}}">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="pc-col3" product-price="{{$cart->price}}">
                            <i data-feather="trash-2"></i>
                        </div>
                    </div>
                    @endforeach
                </div>
                <div class="ccf-row3">
                    <div class="ccf-row3-row1">
                        <span class="span-subtotal">Subtotal:</span>
                        <div class="subtotal-result">
                            <span>Rp</span>
                            <span class="last-subtotal">{{ number_format($subtotal, 0, ',', '.') }}</span>
                        </div>
                    </div>
                    <div class="ccf-row3-row2">
                        <a id="checkout-btn" href="#" class="global-btn green-btn">Checkout</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section id="hero-section" class="section">
        <div class="container">
            <div class="content-wrapper">
                <div id="hero-content" class="h100">
                    <div id="hercon-col1" class="hercon">
                        <div id="hercon-col1-row1">
                            <span class="section-tagline">FAST FOOD & DELIVERY</span>
                            <h1 id="hero-title" class="section-title line-height-small">deliciousness <span class="hero-title-with-color">in every bite</span></h1>
                            <p class="hero-text line-height-normal">Enjoy the best taste with quality ingredients and perfect blends from our best chefs. From classic dishes to specialty menus, we are ready to present an unforgettable culinary experience.</p>
                        </div>
                        <div id="hercon-col1-row2">
                            <a class="global-btn gold-btn" href="">See Menus</a>
                            <a class="global-btn transparent-btn-white" href="/contact-us">Book a Table</a>
                        </div>
                    </div>
                    <div id="hercon-col2" class="hercon">
                        <div class="hercon-fim-wrapper">
                            <div class="hercon-fim">
                                <img src="{{asset('images/hero-4.jpg')}}" alt="">
                            </div>
                            <div id="hero-image-absolute1" class="hiab">
                                <img src="{{asset('images/burger3.jpg')}}" alt="">
                            </div>
                            <div id="hero-image-absolute2" class="hiab">
                                <img src="{{asset('images/pizza1.jpg')}}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="home-about-section" class="section-height">
        <div class="container">
            <div class="content-wrapper">
                <div id="home-about-content">
                    <div id="home-abcon-col1" class="home-abcon">
                        <img class="resto-image abcon-abs" src="{{asset('images/about-1.jpg')}}" alt="">
                        <img src="{{asset('images/chef1.jpg')}}" alt="" class="chef-image abcon-abs">
                        <span id="year">1995</span>
                    </div>
                    <div id="home-abcon-col2" class="home-abcon">
                        <div id="home-abcon-col2-row1">
                            <span class="section-tagline">ABOUT US</span>
                            <h2 id="about-title" class="section-title line-height-small">commitment to taste!</h2>
                            <p class="about-text line-height-normal">
                                Since 1995, DeliciousShop has been a favorite destination for food lovers who want delicious food with the best quality. We believe that food is not just about taste, but also about experience—from quality ingredients, authentic cooking process, to comfortable atmosphere.
                            </p>
                            <div class="open-at">
                                <span>Mon-Fri: 9 AM – 22 PM</span>
                                <span>Saturday: 9 AM – 20 PM
                                </span>
                            </div>
                        </div>
                        <!-- <div id="home-abcon-col2-row2">
                            <a class="global-btn transparent-btn-black" href="#">About Us</a>
                            <div class="ttd">
                                <img src="{{asset('images/ttd.png')}}" alt="">
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="menu-section" class="section-height">
        <div class="container">
            <div class="content-wrapper">
                <div id="menu-content">
                    <div id="menu-content-row1" class="mencon">
                        <span id="menu-tagline" class="section-tagline">
                            we offer
                        </span>
                        <h2 id="menu-title" class="section-title line-height-small">most recommended menus</h2>
                    </div>
                    <div id="menu-content-row2" class="mencon">
                        <div id="card-menu-wrapper">
                            @foreach($menus as $menu)
                            <div data-product="{{$menu->id}}" class="card-menu">
                                <div id="card-menu-row1" class="product-fim">
                                    <img src="{{$menu->image_prod}}" alt="">
                                </div>
                                <div id="card-menu-row2">
                                    <h4 class="product-name">{{$menu->name_prod}}</h4>
                                    <span class="product-price">Rp{{ number_format($menu->harga_prod, 0, ',', '.') }}</span>
                                    <div class="product-qty">
                                        <button type="button" class="min-item">-</button>
                                        <span class="qty-input">0</span>
                                        <button type="button" class="plus-item">+</button>
                                    </div>
                                    <div class="product-button">
                                        <a data-product="{{$menu->id}}" class="global-btn grey-btn add-to-cart-btn" href="#">Add to Cart</a>
                                        <div class="product-detail">
                                            <i data-feather="info"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="popup-payment" class="section">
        <div id="popup-payment-ctn">
            <div id="ppc-col1" class="ppc">
                <span>Subtotal:</span>
                <span>Rp200.000</span>
            </div>
            <div id="ppc-col2" class="ppc">
                <span>Payment Methods</span>
                <div id="ppc-col2-col1">
                    <div id="ppc-col2-col1-col1" class="ppc-met">
                        <img src="{{asset('images/logo-bca.png')}}" alt="">
                        <span>BCA</span>
                    </div>
                    <div id="ppc-col2-col1-col1" class="ppc-met">
                        <img src="{{asset('images/gopay-logo.png')}}" alt="">
                        <span>Gopay</span>
                    </div>
                    <div id="ppc-col2-col1-col1" class="ppc-met">
                        <img src="{{asset('images/dana-logo.png')}}" alt="">
                        <span>Dana</span>
                    </div>
                </div>
                <div id="ppc-col2-col2">
                    <a href="#" class="global-btn red-btn" style="color: #ffffff;" data-btn="cancel">Cancel</a>
                    <a href="#" class="global-btn green-btn" data-btn="send">Send Orders</a>
                </div>
            </div>
        </div>
    </section>

    @push('scripts')
    <script src="{{asset('js/functions.js')}}"></script>
    <script src="{{asset('js/cart.js')}}"></script>
    @endpush

</x-layout>