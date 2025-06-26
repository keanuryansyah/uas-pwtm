@push('styles')
<link rel="stylesheet" href="{{asset('css/style.css')}}">
@endpush

<x-layout title="Home">
    <section id="header-section" class="section">
        <div class="container">
            <div id="header-ctn">
                <div class="hc-col1 hc">
                    <img src="{{asset('images/logo.png')}}" alt="">
                </div>
                <div class="hc-col2 hc">
                    Dashboard
                </div>
            </div>
        </div>
    </section>
    <section id="home-section" class="section">
        <div class="container">
            <div id="home-ctn">
                <div id="card-wrapper">
                    test
                </div>
            </div>
        </div>
    </section>
</x-layout>